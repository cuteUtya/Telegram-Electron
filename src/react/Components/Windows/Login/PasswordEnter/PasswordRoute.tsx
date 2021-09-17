import React, {useState} from "react";
import {authorizationStateWaitPassword, passwordState} from "tdlib-types";
import {PasswordEnter} from "./PasswordEnter";
import {PasswordRecover} from "./PasswordRecover/PasswordRecover";

interface IPasswordRoute{
    authStateWaitPass: authorizationStateWaitPassword;
}

export const PasswordRoute: React.FC<IPasswordRoute> = ({authStateWaitPass}) => {
    const [passwordRecoverState, setPasswordRecoverState] = useState(0);

    switch (passwordRecoverState){
        //window with entering password
        case 0:
            return <PasswordEnter authStateWaitPass={authStateWaitPass} onForgetPass={() => setPasswordRecoverState(1)}/>

        //window with recovering password by mail
        case 1:
            return <PasswordRecover authStateWaitPass={authStateWaitPass} onRememberPassword={() => setPasswordRecoverState(0)}/>
    }
}