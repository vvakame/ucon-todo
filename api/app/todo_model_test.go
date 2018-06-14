package app

import (
	"testing"

	"github.com/favclip/testerator"
	"github.com/mjibson/goon"
)

func TestTodoStoreGet(t *testing.T) {
	_, c, err := testerator.SpinUp()
	if err != nil {
		t.Fatal(err.Error())
	}
	defer testerator.SpinDown()

	g := goon.FromContext(c)

	usr := makeTestDataUser(t, nil)
	todo := makeTestDataTodo(t, g, usr, nil)

	var store *TodoStore
	todo, err = store.Get(g, usr, todo.ID)
	if err != nil {
		t.Fatal(err)
	}
}

func TestTodoStoreList(t *testing.T) {
	_, c, err := testerator.SpinUp()
	if err != nil {
		t.Fatal(err.Error())
	}
	defer testerator.SpinDown()

	g := goon.FromContext(c)

	usr := makeTestDataUser(t, nil)
	makeTestDataTodo(t, g, usr, nil)
	makeTestDataTodo(t, g, usr, nil)
	makeTestDataTodo(t, g, usr, nil)
	makeTestDataTodo(t, g, usr, nil)
	makeTestDataTodo(t, g, usr, nil)

	var store *TodoStore
	todoList, resp, err := store.List(g, usr, &ReqListOptions{
		Limit:  3,
		Offset: 1,
	})
	if err != nil {
		t.Fatal(err)
	}

	if v := len(todoList); v != 3 {
		t.Errorf("unexpected: %v", v)
	}
	if v := resp.Cursor; v == "" {
		t.Errorf("unexpected: %v", v)
	}
}

func TestTodoInsert(t *testing.T) {
	_, c, err := testerator.SpinUp()
	if err != nil {
		t.Fatal(err.Error())
	}
	defer testerator.SpinDown()

	g := goon.FromContext(c)

	usr := makeTestDataUser(t, nil)
	todo := &Todo{
		Text: "test",
	}
	err = todo.Insert(g, usr)
	if err != nil {
		t.Fatal(err)
	}

	var store *TodoStore
	todo, err = store.Get(g, usr, todo.ID)
	if err != nil {
		t.Fatal(err)
	}
}

func TestTodoUpdate(t *testing.T) {
	_, c, err := testerator.SpinUp()
	if err != nil {
		t.Fatal(err.Error())
	}
	defer testerator.SpinDown()

	g := goon.FromContext(c)

	usr := makeTestDataUser(t, nil)
	todo := makeTestDataTodo(t, g, usr, nil)

	var store *TodoStore
	todo, err = store.Get(g, usr, todo.ID)
	if err != nil {
		t.Fatal(err)
	}

	todo.Text = "ucon todo"
	err = todo.Update(g, usr)
	if err != nil {
		t.Fatal(err)
	}
}
