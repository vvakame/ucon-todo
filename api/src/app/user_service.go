package app

import (
	"context"

	"github.com/favclip/ucon"
	"github.com/favclip/ucon/swagger"
	"google.golang.org/appengine/user"
)

func userSetup(swPlugin *swagger.Plugin) {
	s := &userService{}

	tag := swPlugin.AddTag(&swagger.Tag{Name: "User", Description: "API of User"})
	var info *swagger.HandlerInfo

	info = swagger.NewHandlerInfo(s.Welcome)
	ucon.Handle("GET", "/api/user/welcome", info)
	info.Description, info.Tags = "Get own user informations", []string{tag.Name}
}

type userService struct {
}

// UserWelcomeResponse returns loggin status.
type UserWelcomeResponse struct {
	LoggedIn  bool   `json:"loggedIn"`
	LoginURL  string `json:"loginURL"`
	LogoutURL string `json:"logoutURL"`
}

func (s *userService) Welcome(c context.Context) (*UserWelcomeResponse, error) {
	usr := user.Current(c)
	loginURL, err := user.LoginURL(c, "/")
	if err != nil {
		return nil, err
	}
	logoutURL, err := user.LogoutURL(c, "/")
	if err != nil {
		return nil, err
	}

	resp := &UserWelcomeResponse{
		LoggedIn:  usr != nil,
		LoginURL:  loginURL,
		LogoutURL: logoutURL,
	}

	return resp, nil
}
