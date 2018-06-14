package app

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/favclip/testerator"
	"github.com/mjibson/goon"
	"google.golang.org/appengine/aetest"
)

func TestTodoServiceGet(t *testing.T) {
	t.SkipNow()

	inst, c, err := testerator.SpinUp()
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

	jsonReq := &IntIDReq{
		ID: todo.ID,
	}

	r := setupHTTPRequest(t, inst, "GET", fmt.Sprintf("/api/todo/%d", jsonReq.ID), jsonReq)
	aetest.Login(usr, r)

	w := httptest.NewRecorder()
	http.DefaultServeMux.ServeHTTP(w, r)

	if w.Code != 200 {
		b, _ := ioutil.ReadAll(w.Body)
		t.Fatalf("unexpected %d, expected 200, body=%s", w.Code, string(b))
	}
}

func TestTodoServiceList(t *testing.T) {
	inst, c, err := testerator.SpinUp()
	if err != nil {
		t.Fatal(err.Error())
	}
	defer testerator.SpinDown()

	g := goon.FromContext(c)

	usr := makeTestDataUser(t, nil)

	makeTestDataTodo(t, g, usr, nil)
	makeTestDataTodo(t, g, usr, nil)
	makeTestDataTodo(t, g, usr, nil)

	r := setupHTTPRequest(t, inst, "GET", "/api/todo", nil)
	aetest.Login(usr, r)

	w := httptest.NewRecorder()
	http.DefaultServeMux.ServeHTTP(w, r)

	if w.Code != 200 {
		b, _ := ioutil.ReadAll(w.Body)
		t.Fatalf("unexpected %d, expected 200, body=%s", w.Code, string(b))
	}
}

func TestTodoServiceInsert(t *testing.T) {
	inst, _, err := testerator.SpinUp()
	if err != nil {
		t.Fatal(err.Error())
	}
	defer testerator.SpinDown()

	usr := makeTestDataUser(t, nil)

	jsonReq := &TodoJSON{
		Text: "test",
	}
	r := setupHTTPRequest(t, inst, "POST", "/api/todo", jsonReq)
	aetest.Login(usr, r)

	w := httptest.NewRecorder()
	http.DefaultServeMux.ServeHTTP(w, r)

	if w.Code != 200 {
		b, _ := ioutil.ReadAll(w.Body)
		t.Fatalf("unexpected %d, expected 200, body=%s", w.Code, string(b))
	}
}

func TestTodoServiceUpdate(t *testing.T) {
	inst, c, err := testerator.SpinUp()
	if err != nil {
		t.Fatal(err.Error())
	}
	defer testerator.SpinDown()

	g := goon.FromContext(c)

	usr := makeTestDataUser(t, nil)

	todo := makeTestDataTodo(t, g, usr, nil)

	jsonReq, err := NewTodoJSONBuilder().AddAll().Convert(todo)
	if err != nil {
		t.Fatal(err.Error())
	}
	jsonReq.Text = "Buy cookie"
	t.Logf("%#v", jsonReq)

	r := setupHTTPRequest(t, inst, "PUT", fmt.Sprintf("/api/todo/%d", jsonReq.ID), jsonReq)
	aetest.Login(usr, r)

	w := httptest.NewRecorder()
	http.DefaultServeMux.ServeHTTP(w, r)

	if w.Code != 200 {
		b, _ := ioutil.ReadAll(w.Body)
		t.Fatalf("unexpected %d, expected 200, body=%s", w.Code, string(b))
	}
}
