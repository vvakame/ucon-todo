export interface Noop {
}
export interface Todo {
    createdAt?: string; // date-time
    done?: boolean;
    id?: string; // int64
    text?: string;
    updatedAt?: string; // date-time
}
export interface TodoListResp {
    cursor?: string;
    list?: Todo[];
}
export interface UserWelcomeResponse {
    loggedIn?: boolean;
    loginURL?: string;
    logoutURL?: string;
}
