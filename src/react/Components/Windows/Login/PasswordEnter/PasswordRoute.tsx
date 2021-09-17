import React, {useState} from "react";
import {authorizationStateWaitPassword, passwordState} from "tdlib-types";
import {PasswordEnter} from "./PasswordEnter";
import {PasswordRecover} from "./PasswordRecover/PasswordRecover";

interface IPasswordRoute{
    authStateWaitPass: authorizationStateWaitPassword;
}

export const PasswordRoute: React.FC<IPasswordRoute> = ({authStateWaitPass}) => {
    let any: any;
    const [window, setWindow] = useState(any);

    if (window == any) {
        if (authStateWaitPass.recovery_email_address_pattern === "") {
            return <PasswordEnter authStateWaitPass={authStateWaitPass}/>
        } else {
            return <PasswordRecover authStateWaitPass={authStateWaitPass}
                                    //return user to input window
                                    onRememberPassword={() => setWindow(<PasswordEnter
                                        authStateWaitPass={authStateWaitPass}
                                        //move user to password recover window
                                        onForgetPass={() => setWindow(any)}/>)}/>
        }
    } else {
        return window;
    }
}