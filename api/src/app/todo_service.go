package app

import (
	"github.com/favclip/ucon"
	"github.com/favclip/ucon/swagger"
	"github.com/mjibson/goon"
	"golang.org/x/net/context"
	"google.golang.org/appengine/log"
	"google.golang.org/appengine/user"
)

func todoSetup(swPlugin *swagger.Plugin) {
	s := &todoService{}

	tag := swPlugin.AddTag(&swagger.Tag{Name: "Todo", Description: "API of Todo"})
	var info *swagger.HandlerInfo

	info = swagger.NewHandlerInfo(s.Insert)
	ucon.Handle("POST", "/api/todo", info)
	info.Description, info.Tags = "Insert todo", []string{tag.Name}

	info = swagger.NewHandlerInfo(s.Update)
	ucon.Handle("PUT", "/api/todo/{id}", info)
	info.Description, info.Tags = "Update todo", []string{tag.Name}

	info = swagger.NewHandlerInfo(s.List)
	ucon.Handle("GET", "/api/todo", info)
	info.Description, info.Tags = "Get todo list", []string{tag.Name}

	info = swagger.NewHandlerInfo(s.Delete)
	ucon.Handle("DELETE", "/api/todo/{id}", info)
	info.Description, info.Tags = "Delete todo", []string{tag.Name}
}

type todoService struct {
}

func (s *todoService) Insert(c context.Context, todoJSON *TodoJSON) (*TodoJSON, error) {
	usr := user.Current(c)
	log.Infof(c, "user: %#v", usr)

	g := goon.FromContext(c)
	todo, err := todoJSON.Convert()
	if err != nil {
		return nil, err
	}

	err = todo.Insert(g, usr)
	if err != nil {
		return nil, err
	}

	todoJSON, err = NewTodoJSONBuilder().AddAll().Convert(todo)
	if err != nil {
		return nil, err
	}

	return todoJSON, nil
}

func (s *todoService) Update(c context.Context, todoJSON *TodoJSON) (*TodoJSON, error) {
	usr := user.Current(c)
	log.Infof(c, "user: %#v", usr)

	g := goon.FromContext(c)
	todo, err := todoJSON.Convert()
	if err != nil {
		return nil, err
	}

	err = todo.Update(g, usr)
	if err != nil {
		return nil, err
	}

	todoJSON, err = NewTodoJSONBuilder().AddAll().Convert(todo)
	if err != nil {
		return nil, err
	}

	return todoJSON, nil
}

// TodoListResp is fetch options for Todo list query.
type TodoListResp struct {
	List []*TodoJSON `json:"list"`
	RespListOptions
}

func (s *todoService) List(c context.Context, req *ReqListOptions) (*TodoListResp, error) {
	usr := user.Current(c)
	log.Infof(c, "user: %#v", usr)

	g := goon.FromContext(c)

	var store *TodoStore
	todoList, respOpts, err := store.List(g, usr, req)
	if err != nil {
		return nil, err
	}

	log.Infof(c, "%#v", todoList)

	todoJSONList, err := NewTodoJSONBuilder().AddAll().ConvertList(todoList)
	if err != nil {
		return nil, err
	}

	resp := &TodoListResp{
		List:            todoJSONList,
		RespListOptions: *respOpts,
	}

	return resp, err
}

func (s *todoService) Delete(c context.Context, req *IntIDInPathReq) (*TodoJSON, error) {
	usr := user.Current(c)
	log.Infof(c, "user: %#v", usr)

	g := goon.FromContext(c)

	var store *TodoStore
	todo, err := store.Delete(g, usr, req.ID)
	if err != nil {
		return nil, err
	}

	todoJSON, err := NewTodoJSONBuilder().AddAll().Convert(todo)
	if err != nil {
		return nil, err
	}

	return todoJSON, nil
}
