package app

import (
	"fmt"
	"time"

	"github.com/mjibson/goon"
	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
	"google.golang.org/appengine/user"
)

// Todo means todo information.
// +jwg
// +qbg
type Todo struct {
	ParentKey *datastore.Key `json:"-" datastore:"-" goon:"parent"` // UserID
	ID        int64          `datastore:"-" goon:"id"`
	Text      string
	Done      bool
	CreatedAt time.Time `datastore:",noindex"`
	UpdatedAt time.Time `datastore:",noindex"`
}

// TodoStore manages Circle CRUD operation.
type TodoStore struct {
}

// Get Todo entity.
func (store *TodoStore) Get(g *goon.Goon, usr *user.User, id int64) (*Todo, error) {
	if usr == nil || usr.ID == "" {
		return nil, ErrLoginRequired
	} else if id == 0 {
		return nil, ErrBadRequest
	}

	todo := store.init(g, usr, id)
	todoList, err := store.batchGet(g, todo)
	if merr, ok := err.(appengine.MultiError); ok {
		return nil, merr[0]
	} else if err != nil {
		return nil, err
	}

	return todoList[0], nil
}

// List returns Todo entities.
func (store *TodoStore) List(g *goon.Goon, usr *user.User, req *ReqListOptions) ([]*Todo, *RespListOptions, error) {
	if usr == nil || usr.ID == "" {
		return nil, nil, ErrLoginRequired
	}

	usrKey := datastore.NewKey(g.Context, "User", usr.ID, 0, nil)
	qb := NewTodoQueryBuilder().Ancestor(usrKey)

	ldr := &TodoListLoader{
		List: make([]*Todo, 0, req.Limit),
		Req:  req,
		Resp: &RespListOptions{},
	}
	err := ExecQuery(g, qb.Query(), ldr)
	if err != nil {
		return nil, nil, err
	}

	return ldr.List, ldr.Resp, err
}

func (store *TodoStore) init(g *goon.Goon, usr *user.User, id int64) *Todo {
	usrKey := datastore.NewKey(g.Context, "User", usr.ID, 0, nil)
	todo := &Todo{
		ParentKey: usrKey,
		ID:        id,
	}
	return todo
}

func (store *TodoStore) batchGet(g *goon.Goon, todoList ...*Todo) ([]*Todo, error) {
	if err := g.GetMulti(todoList); err != nil {
		return nil, err
	}

	return todoList, nil
}

func (store *TodoStore) batchPut(g *goon.Goon, todoList ...*Todo) error {
	if _, err := g.PutMulti(todoList); err != nil {
		return err
	}

	return nil
}

// Insert Todo entity.
func (todo *Todo) Insert(g *goon.Goon, usr *user.User) error {
	if usr == nil || usr.ID == "" {
		return ErrLoginRequired
	} else if todo.ID != 0 {
		return ErrBadRequest
	}

	todo.ParentKey = datastore.NewKey(g.Context, "User", usr.ID, 0, nil)
	_, err := g.Put(todo)
	if err != nil {
		return err
	}

	return nil
}

// Update Todo entity.
func (todo *Todo) Update(g *goon.Goon, usr *user.User) error {
	if usr == nil || usr.ID == "" {
		return ErrLoginRequired
	} else if todo.ID == 0 {
		return ErrBadRequest
	}

	todo.ParentKey = datastore.NewKey(g.Context, "User", usr.ID, 0, nil)
	_, err := g.Put(todo)
	if err != nil {
		return err
	}

	return nil
}

// Delete Todo entity.
func (store *TodoStore) Delete(g *goon.Goon, usr *user.User, id int64) (*Todo, error) {
	if usr == nil || usr.ID == "" {
		return nil, ErrLoginRequired
	} else if id == 0 {
		return nil, ErrBadRequest
	}

	todo := &Todo{
		ParentKey: datastore.NewKey(g.Context, "User", usr.ID, 0, nil),
		ID:        id,
	}
	err := g.Get(todo)
	if err == datastore.ErrNoSuchEntity {
		return nil, ErrBadRequest
	} else if err != nil {
		return nil, err
	}

	key := g.Key(todo)
	err = g.Delete(key)
	if err != nil {
		return nil, err
	}

	return todo, nil
}

// TodoListLoader is list loader for Todo kind.
type TodoListLoader struct {
	List   []*Todo
	cursor datastore.Cursor
	Req    *ReqListOptions
	Resp   *RespListOptions
}

// LoadEntity returns specify entity from Datastore.
func (ldr *TodoListLoader) LoadEntity(g *goon.Goon, key *datastore.Key) (interface{}, error) {
	var store *TodoStore
	todo, err := store.Get(g, &user.User{ID: key.Parent().StringID()}, key.IntID())
	if err != nil {
		return nil, err
	}
	return todo, nil
}

// Append entity.
func (ldr *TodoListLoader) Append(v interface{}) error {
	if todo, ok := v.(*Todo); ok {
		ldr.List = append(ldr.List, todo)
	} else {
		return fmt.Errorf("v is not *Todo, actual: %#v", v)
	}

	return nil
}

// PostProcess do something...
func (ldr *TodoListLoader) PostProcess(g *goon.Goon) error {
	return nil
}

// ReqListOptions returns *ReqListOptions.
func (ldr *TodoListLoader) ReqListOptions() *ReqListOptions {
	return ldr.Req
}

// RespListOptions returns *RespListOptions.
func (ldr *TodoListLoader) RespListOptions() *RespListOptions {
	return ldr.Resp
}
