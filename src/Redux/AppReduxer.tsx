import Client from 'tdl'
import {Action} from "./Action";
import {store} from "../react";
import InitClient from '../Client';
import {apiId, apiHash, UseTestDC, Version, LogVerbosityLevel} from "../AppConstanst";
import React from "react";
import {background, Background, backgrounds, Update} from "tdlib-types";

function AppReduxer(state: State, action: Action) : State{
    console.log('dispatch', action);
    switch (action.type) {
        case "App/ChangeAppBackground":
            if(action.IsDark)
                state.BackgroundDark = action.Background;
            else
                state.BackgroundLight = action.Background;
            break;

        case "TDlib/ChangeAuthState":
            state.AuthorizationState = action.NewAuthState;
            break;
    }

    return state;
}

class State {
    public Client: Client;
    public AuthorizationState: any = "None";
    public ProcessUpdates: boolean = true;
    public BackgroundLight: Background;
    public BackgroundDark: Background;

    Init(client: Client) {
        this.Client = client;
        this.Client.invoke({_: "setLogVerbosityLevel", new_verbosity_level: LogVerbosityLevel});

        // @ts-ignore
        document.__proto__.Client = this.Client;
        // @ts-ignore
        document.__proto__.Store = store;

        const updateListener = (v: Update) => {
            if (this.ProcessUpdates) {
                console.log(v._);
                switch (v._) {
                    case "updateAuthorizationState":
                        store.dispatch({type: "TDlib/ChangeAuthState", NewAuthState: v.authorization_state});
                        break;

                    case "updateSelectedBackground":
                        console.log(v);
                        if(v.background != null)
                            store.dispatch({type: "App/ChangeAppBackground", Background: v.background, IsDark: v.for_dark_theme});
                        else{
                            this.Client.invoke({_: "getBackgrounds"}).then((backs: backgrounds) => {
                                this.Client.invoke({_: "setBackground", background: {
                                    _: "inputBackgroundRemote",
                                    background_id: backs.backgrounds[0].id
                                }})
                            })
                        }
                        break;
                }
            }
        }

        const errorListener = v => {
            console.log(v);
        }

        this.Client.on('error', errorListener);
        this.Client.on('update', updateListener)
    }

    constructor() {
        InitClient({
                apiId: apiId,
                apiHash: apiHash,
                useTestDc: UseTestDC,
                tdlibParameters: {
                    application_version: Version
                }
            }
        ).then((client) => this.Init(client));
    }
}

export {AppReduxer, State}