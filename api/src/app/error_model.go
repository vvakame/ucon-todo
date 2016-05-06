package app

import "net/http"

// ErrNotForInsert is an error.
var ErrNotForInsert = &HTTPError{
	Code: http.StatusBadRequest,
	Text: "not for insert",
}

// ErrNotForUpdate is an error.
var ErrNotForUpdate = &HTTPError{
	Code: http.StatusBadRequest,
	Text: "not for update",
}

// ErrNoSuchEntity is an error that specified entity is not exists in Datastore.
var ErrNoSuchEntity = &HTTPError{
	Code: http.StatusBadRequest,
	Text: "no such entity",
}

// ErrLoginRequired is an error.
var ErrLoginRequired = &HTTPError{
	Code: http.StatusUnauthorized,
	Text: "login required",
}

// ErrAlreadyLoggedIn is an error.
var ErrAlreadyLoggedIn = &HTTPError{
	Code: http.StatusUnauthorized,
	Text: "already logged in",
}

// ErrTooLarge is an error.
var ErrTooLarge = &HTTPError{
	Code: http.StatusBadRequest,
	Text: "too large",
}

// ErrBadRequest is an error.
var ErrBadRequest = &HTTPError{
	Code: http.StatusBadRequest,
	Text: "bad request",
}

// ErrAlreadyExists is an error.
var ErrAlreadyExists = &HTTPError{
	Code: http.StatusBadRequest,
	Text: "already exists",
}
