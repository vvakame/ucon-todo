package app

import (
	"fmt"
	"net/url"
	"strings"

	"github.com/favclip/ucon"
	"github.com/favclip/ucon/swagger"
	"golang.org/x/net/context"
	"google.golang.org/appengine/datastore"
	"google.golang.org/appengine/log"
	"google.golang.org/appengine/taskqueue"
)

func backupSetup(swPlugin *swagger.Plugin) {
	s := &backupService{}

	tag := swPlugin.AddTag(&swagger.Tag{Name: "Backup", Description: "バックアップを実行する"})
	var info *swagger.HandlerInfo

	info = swagger.NewHandlerInfo(s.BackupDatastore)
	ucon.Handle("GET", "/api/backup-datastore", info)
	info.Description, info.Tags = "Datastoreのバックアップを実行する", []string{tag.Name}
}

type backupService struct {
}

func (s *backupService) BackupDatastore(c context.Context) (*Noop, error) {
	t, err := s.addBackupTask(c, "techbookfest-datastore-backup", "cron", []string{
		"GorillaSession",
		"TempUser",
	})
	if err != nil {
		log.Debugf(c, err.Error())
		return nil, err
	}
	if _, err := taskqueue.Add(c, t, "backup-datastore"); err != nil {
		log.Debugf(c, err.Error())
		return nil, err
	}

	return &Noop{}, nil
}

func (s *backupService) addBackupTask(c context.Context, bucketName, fileNamePrefix string, ignoreKinds []string) (*taskqueue.Task, error) {
	q := url.Values{}

	// date information add automatically
	q.Add("name", fmt.Sprintf("%s-", fileNamePrefix))
	q.Add("filesystem", "gs")
	q.Add("gs_bucket_name", bucketName)

	kinds, err := s.getKinds(c)
	if err != nil {
		return nil, err
	}
	ignoreMap := make(map[string]bool, len(ignoreKinds))
	for _, kind := range ignoreKinds {
		ignoreMap[kind] = true
	}
	for _, kind := range kinds {
		if _, ok := ignoreMap[kind]; !ok {
			q.Add("kind", kind)
		}
	}

	path := fmt.Sprintf("/_ah/datastore_admin/backup.create?%s", q.Encode())
	log.Debugf(c, "datastore-backup request: %s", path)
	task := &taskqueue.Task{
		Path:   path,
		Method: "GET",
	}
	return task, nil
}

func (s *backupService) getKinds(c context.Context) ([]string, error) {
	t := datastore.NewQuery("__kind__").KeysOnly().Run(c)
	var kinds []string
	for {
		key, err := t.Next(nil)
		if err == datastore.Done {
			break
		}
		if err != nil {
			return nil, err
		}
		if strings.HasPrefix(key.StringID(), "_") {
			continue
		}
		kinds = append(kinds, key.StringID())
	}
	return kinds, nil
}
