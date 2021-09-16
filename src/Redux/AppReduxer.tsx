import Client from 'tdl'
import {AuthStateChange, OpenNewClientWithPhoneNumber} from "./Action";
import {store} from "../react";
import InitClient from '../Client';
import {apiId, apiHash} from "../AppConstanst";
import React from "react";
import {updateAuthorizationState} from "tdlib-types";

function AppReduxer(state: State, action: any) : State{
    console.log('dispatch', action);
    switch (action.type) {
        case AuthStateChange:
            state.AuthorizationState = action.state;
            break;

    }

    return state;
}

class State{
    public Client: Client;
    public AuthorizationState: any = "None";

    public ProcessUpdates: boolean = true;

    Init(client: Client) {
        this.Client = client;
        this.Client.invoke({_: "setLogVerbosityLevel", new_verbosity_level: 5});//{_: "setVerbosityLevel", verbosity_level: 5})

        // @ts-ignore
        document.__proto__.Client = this.Client;
        const updateListener = v => {
            console.log(v);
            if(this.ProcessUpdates) {
                switch (v._) {
                    case "updateAuthorizationState":
                        store.dispatch({type: AuthStateChange, state: v.authorization_state})
                        break;
                }
            }
        }

        const errorListener = v => {
            console.log(v);
        }

        this.Client.on('error', errorListener);
        this.Client.on('update', updateListener)
        this.Client.on('response', (res) => console.log(res));
    }

    constructor() {
        InitClient({apiId: apiId, apiHash: apiHash}).then((client) => this.Init(client));
    }
}

export {AppReduxer, State}