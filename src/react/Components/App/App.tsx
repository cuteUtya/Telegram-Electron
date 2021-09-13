import React from "react";
import {useSelector} from "react-redux";
import {State} from "../../../Redux/AppReduxer";
import Load from "../Windows/Load/Load";
import PhoneEnter from "../Windows/Login/PhoneEnter/PhoneEnter";

export const App = () => {
    var authState = useSelector((state: State) => state.AuthorizationState);
    var client = useSelector((state: State) => state.Client);

    switch (authState?._){
        case 'authorizationStateWaitPhoneNumber':
            //request qr
            client.invoke({
                _: "requestQrCodeAuthentication"
            })
            return <PhoneEnter/>

        case 'authorizationStateWaitOtherDeviceConfirmation':
            return <PhoneEnter qrConfirmLink={authState.link}/>
    }

    return <Load/>
}
