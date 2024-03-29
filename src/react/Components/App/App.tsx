import React, {useState} from "react";
import {useSelector} from "react-redux";
import {State} from "../../../Redux/AppReduxer";
import Load from "../Windows/Load/Load";
import PhoneEnter from "../Windows/Login/PhoneEnter/PhoneEnter";
import {CodeEnter} from "../Windows/Login/CodeEnter/CodeEnter";
import {
    authorizationStateWaitCode,
    authorizationStateWaitOtherDeviceConfirmation, authorizationStateWaitPassword, authorizationStateWaitRegistration,
    updateAuthorizationState
} from "tdlib-types";
import InitClient from "../../../Client";
import {apiHash, apiId} from "../../../AppConstanst";
import {PasswordEnter} from "../Windows/Login/PasswordEnter/PasswordEnter";
import {PasswordRoute} from "../Windows/Login/PasswordEnter/PasswordRoute";
import {RegistrationRoute} from "../Windows/Login/Registration/RegistrationRoute";
import {ChatList} from "../Windows/ChatList/ChatList";

let QrClientInit = false;

export const App = () => {
    let authState = useSelector((state: State) => state.AuthorizationState);

    const [QrLink, SetQrLink] = useState("");


    if (!QrClientInit && authState._ != "authorizationStateReady") {
        QrClientInit = true;
        InitClient(
            {
                apiId: apiId,
                apiHash: apiHash,
                filesDirectory: "D:/tdfiles",
                databaseDirectory: "D:/tddb"
            }).then((client) => {
            client.invoke({_: "requestQrCodeAuthentication", other_user_ids: []});

            client.on("update", (update) => {
                if (update._ === "updateAuthorizationState")
                    if ((update as updateAuthorizationState).authorization_state._ === "authorizationStateWaitOtherDeviceConfirmation") {
                        SetQrLink(((update as updateAuthorizationState).authorization_state as authorizationStateWaitOtherDeviceConfirmation).link);
                    }
            })
        })
    }

    switch (authState?._) {
        case 'authorizationStateWaitPhoneNumber':
            return <PhoneEnter qrConfirmLink={QrLink}/>

        case 'authorizationStateClosed':
            return <PhoneEnter qrConfirmLink={QrLink}/>;

        case 'authorizationStateWaitCode':
            return <CodeEnter codeInfo={(authState as authorizationStateWaitCode).code_info}/>

        case 'authorizationStateWaitPassword':
            return <PasswordRoute authStateWaitPass={authState as authorizationStateWaitPassword}/>

        case 'authorizationStateWaitRegistration':
            return <RegistrationRoute authStateWaitRegistration={authState as authorizationStateWaitRegistration}/>

        case "authorizationStateReady":
            return <ChatList/>
    }
    return <Load/>
}
