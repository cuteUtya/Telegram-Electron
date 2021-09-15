import Client from 'tdl'
import {AuthStateChange, OpenNewClientWithPhoneNumber} from "./Action";
import {store} from "../react";
import InitClient from '../Client';
import {useState} from "react";
import React from "react";
import {useStore} from "react-redux";
import {updateAuthorizationState} from "tdlib-types";

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

            console.log(state.Client);



            /*
     * JS обёртка умирает после 429 ошибки и не отсылает Tdlib никакие запросы, не знаю почему (((
     * да блять почему
     * */
                state.Client.invoke({_: "logOut"}).then(() => {
                    function InitNewClient(){
                        InitClient().then((client) => {
                            client.on('update',
                                (v) => {
                                    if(v._ === "updateAuthorizationState") {
                                        if((v as updateAuthorizationState).authorization_state._ === "authorizationStateWaitCode") {
                                            state.Init(client);
                                            state.ProcessUpdates = true;
                                            store.dispatch({
                                                type: AuthStateChange,
                                                state: (v as updateAuthorizationState).authorization_state
                                            })
                                        }
                                    }
                                });
                            client.invoke({
                                _: "setAuthenticationPhoneNumber",
                                phone_number: action.phoneNumber
                            })

                        })
                    }
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
        InitClient().then((client) => this.Init(client));
    }
}

export {AppReduxer, State}