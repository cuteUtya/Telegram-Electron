import React from "react";
import {authorizationStateWaitPassword, passwordState} from "tdlib-types";
import {PasswordEnter} from "./PasswordEnter";
import {PasswordRecover} from "./PasswordRecover/PasswordRecover";

interface IPasswordRoute{
    authStateWaitPass: authorizationStateWaitPassword;
}

export const PasswordRoute: React.FC<IPasswordRoute> = ({authStateWaitPass}) => {
    if(authStateWaitPass.recovery_email_address_pattern == ""){
        return <PasswordEnter authStateWaitPass={authStateWaitPass}/>
    } else{
        return <PasswordRecover authStateWaitPass={authStateWaitPass}/>
    }
}