//go:generate jwg -output model_json.go .
//go:generate qbg -output model_query.go .

package app

import (
	"fmt"
	"math/rand"
	"mime"
	"net/http"
	"os"
	"path/filepath"
	"reflect"
	"strings"
	"time"

	"github.com/favclip/ucon"
	"github.com/favclip/ucon/swagger"
	"golang.org/x/net/context"
	"google.golang.org/appengine"
	"google.golang.org/appengine/log"

	// add more image format
	_ "image/gif"
	_ "image/jpeg"
	// add more image format
	_ "golang.org/x/image/bmp"
)

func init() {
	var _ ucon.HTTPErrorResponse = &HTTPError{}

	rand.Seed(time.Now().UTC().UnixNano())

	mime.AddExtensionType(".json", "application/json;charset=utf-8")
	mime.AddExtensionType(".map", "application/json;charset=utf-8")

	http.HandleFunc("/_ah/start", func(w http.ResponseWriter, r *http.Request) {
		// TODO
	})

	ucon.Middleware(UseAppengineContext)
	ucon.Orthodox()
	ucon.Middleware(UseReqRespLogger)

	swObj := &swagger.Object{
		Info: &swagger.Info{
			Title:   "ucon todo",
			Version: "v1",
		},
		Schemes: []string{"https"},
	}
	if appengine.IsDevAppServer() {
		swObj.Schemes = []string{"http"}
	}
	swPlugin := swagger.NewPlugin(&swagger.Options{
		Object: swObj,
		DefinitionNameModifier: func(refT reflect.Type, defName string) string {
			if strings.HasSuffix(defName, "JSON") {
				return defName[:len(defName)-4]
			}
			return defName
		},
	})
	ucon.Plugin(swPlugin)

	userSetup(swPlugin)
	todoSetup(swPlugin)

	backupSetup(swPlugin)

	ucon.HandleFunc("GET", "/", func(w http.ResponseWriter, r *http.Request, c context.Context) {
		if r.URL.Scheme == "http" {
			url := r.URL
			url.Scheme = "https"
			http.Redirect(w, r, url.String(), http.StatusFound)
			return
		}

		// w.Header().Set("Cache-Control", "public, max-age=600")

		filePath := "./public/" + r.URL.Path[len("/"):]

		isFileExist := func(fileName string) bool {
			fi, err := os.Stat(fileName)
			if err != nil {
				return false
			}
			if fi.IsDir() {
				return false
			}
			return true
		}

		if isFileExist(filePath) {
			log.Debugf(c, "respond %s", filePath)

			http.ServeFile(w, r, filePath)
			return
		}

		mimeType := mime.TypeByExtension(filepath.Ext(filePath))
		if mimeType != "" {
			// if request path contains .ext, simply response 404.
			http.NotFound(w, r)
			return
		}

		if strings.HasSuffix(filePath, "/") {
			filePath += "index.html"
		} else {
			filePath += "/index.html"
		}
		if isFileExist(filePath) {
			log.Debugf(c, "respond %s", filePath)

			http.ServeFile(w, r, filePath)
			return
		}

		// fallback to /index.html
		http.ServeFile(w, r, "./public/")
	})

	ucon.DefaultMux.Prepare()
	http.Handle("/", ucon.DefaultMux)
}

// HTTPError is response JSON.
type HTTPError struct {
	Code int    `json:"code"`
	Text string `json:"text"`
}

// Error returns error string.
func (err *HTTPError) Error() string {
	return fmt.Sprintf("status %d: %s", err.Code, err.Text)
}

// StatusCode returns http status code.
func (err *HTTPError) StatusCode() int {
	return err.Code
}

// ErrorMessage returns itself. it uses to respone payload.
func (err *HTTPError) ErrorMessage() interface{} {
	return err
}
