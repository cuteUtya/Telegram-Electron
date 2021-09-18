import React, {useState} from "react";
import {authorizationStateWaitPassword, passwordState} from "tdlib-types";
import {PasswordEnter} from "./PasswordEnter";
import {PasswordRecover} from "./PasswordRecover/PasswordRecover";
import {PasswordRecoverTip} from "./PasswordRecoverTip/PasswordRecoverTip";
import {useSelector} from "react-redux";
import {State} from "../../../../../Redux/AppReduxer";

interface IPasswordRoute{
    authStateWaitPass: authorizationStateWaitPassword;
}

export const PasswordRoute: React.FC<IPasswordRoute> = ({authStateWaitPass}) => {
    const [passwordRecoverState, setPasswordRecoverState] = useState(0);
    const client = useSelector((state: State) => state.Client);

    switch (passwordRecoverState) {
        //window with entering password
        case 0:
            return <PasswordEnter
                authStateWaitPass={authStateWaitPass}
                onForgetPasswordClick={() => {
                    if (authStateWaitPass.has_recovery_email_address) //{
                        client.invoke({_: "requestAuthenticationPasswordRecovery"}).then(() => setPasswordRecoverState(1))
                    else
                        setPasswordRecoverState(2);
                }}/>

        //window with recovering password by mail
        case 1:
            return <PasswordRecover
                authStateWaitPass={authStateWaitPass}
                onRememberPasswordClick={() => setPasswordRecoverState(0)}
                onDoNotHaveMailAccessClick={() => setPasswordRecoverState(2)}/>

        //how to recover password without mail access
        case 2:
            return <PasswordRecoverTip
                onBackToLastWindowClick={() => {
                    if(authStateWaitPass.has_recovery_email_address)
                        setPasswordRecoverState(1);
                    else
                        setPasswordRecoverState(0);
                }}/>
    }
}