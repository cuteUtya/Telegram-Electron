import Client from 'tdl'
import {AuthStateChange, OpenNewClientWithPhoneNumber} from "./Action";
import {store} from "../react";
import InitClient from '../Client';
import {useState} from "react";
import React from "react";

function AppReduxer(state: State, action: any) : State{
    console.log('dispatch', action);
    switch (action.type){
        case AuthStateChange:
            state.AuthorizationState = action.state;
            break;

            /*
            * I can't just invoke 'setAuthenticationPhoneNumber' after invoking RequestQrCodeAuthentication, because...
            * «Because after RequestQrCodeAuthentication is called, you can be logged in anytime.
            * To cancel this logging in attempt you must call logOut. After this request is completed,
            * you can create a new TDLib instance and use SetAuthenticationPhoneNumber there.»
            *                                                               Aliaksei Levin, Tdlib developer
            *
            * this actual reason for this crutch  ¯\_(ツ)_/¯
            * */
        case OpenNewClientWithPhoneNumber:
            state.ProcessUpdates = false;
            state.Client.invoke({_: "logOut"}).then(() => {
                console.log("Close");
                InitClient().then((client) => {
                    client.on('update', (v) => console.log('new client', v));
                    client.invoke({
                        _: "setAuthenticationPhoneNumber",
                        phone_number: action.phoneNumber
                    }).then(() => {
                        state.Init(client);
                        state.ProcessUpdates = true;
                    })
                })
            })
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
        const listener = v => {
            console.log(v);
            if(this.ProcessUpdates) {
                switch (v._) {
                    case "updateAuthorizationState":
                        store.dispatch({type: AuthStateChange, state: v.authorization_state})
                        break;
                }
            }
        }
        this.Client.on('update', listener)
    }

    constructor() {
        InitClient().then((client) => this.Init(client));
    }
}

export {AppReduxer, State}