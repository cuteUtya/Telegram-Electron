import React from "react";
import {useSelector} from "react-redux";
import {State} from "../../../Redux/AppReduxer";
import Load from "../Windows/Load/Load";
import PhoneEnter from "../Windows/Login/PhoneEnter/PhoneEnter";
import {CodeEnter} from "../Windows/Login/CodeEnter/CodeEnter";
import {authorizationStateWaitCode} from "tdlib-types";

export const App = () => {
    var authState = useSelector((state: State) => state.AuthorizationState);
    var client = useSelector((state: State) => state.Client);

    console.log(authState?._);
    switch (authState?._){
        case 'authorizationStateWaitPhoneNumber':
            //request qr
            client.invoke({
                _: "requestQrCodeAuthentication"
            })
            return <PhoneEnter/>

        case 'authorizationStateClosed':
            return <PhoneEnter/>;

        case 'authorizationStateWaitOtherDeviceConfirmation':
            return <PhoneEnter qrConfirmLink={authState.link}/>

        case 'authorizationStateWaitCode':
            return <CodeEnter codeInfo={(authState as authorizationStateWaitCode).code_info}/>
    }

    return <Load/>
}
