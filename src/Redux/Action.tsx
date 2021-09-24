import {AuthorizationState, Background} from "tdlib-types";

export type Action =
    | ChangeAppBackgroundAction
    | ChangeAuthStateAction

export type ChangeAppBackgroundAction = {
    readonly type: "App/ChangeAppBackground";
    Background: Background;
    IsDark: Boolean;
}

export type ChangeAuthStateAction = {
    readonly type: "TDlib/ChangeAuthState";
    NewAuthState: AuthorizationState;
}