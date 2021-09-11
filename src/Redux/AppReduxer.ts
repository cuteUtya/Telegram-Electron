import Client from 'tdl'
import {TDLib} from "tdl-tdlib-addon";
import {AuthStateChange} from "./Action";
//import {useStore} from "react-redux";
import {store} from "../react";

function AppReduxer(state: State, action: any) : State{
    switch (action.type){
        case AuthStateChange:
            state.AuthorizationState = action.state;
            console.log('update state', action.state);
            break;
    }

    return state;
}

class State{
    public Client: Client = new Client(new TDLib("tdjson.dll", "C:\\Users\\Timur\\electronProjects\\Electrogram\\node_modules\\tdl-tdlib-addon\\build\\Release\\td.node"), {
      apiId: 6627546,
      apiHash: "7c84903108b41b3872080707a6da6ad6"
    })
    public AuthorizationState: any = "None";

    constructor() {
        //for debug
        //@ts-ignore
        document.__proto__.tdlib = this.Client;
        //@ts-ignore

        //document.__proto__.store = store;


        this.Client.connect().then(() => {
            const listener = v => {
                console.log(v);
                switch (v._){
                    case "updateAuthorizationState":
                        store.dispatch({type: AuthStateChange, state: v.authorization_state})
                        break;
                }
            }
            this.Client.on('update', listener)
        })
    }
}

export {AppReduxer, State}