import React from "react";
import { useSelector } from "react-redux";
import Load from "../Windows/Load/Load";
import PhoneEnter from "../Windows/Login/PhoneEnter/PhoneEnter";
export const App = () => {
    var authState = useSelector((state) => state.AuthorizationState);
    var client = useSelector((state) => state.Client);
    switch (authState === null || authState === void 0 ? void 0 : authState._) {
        case 'authorizationStateWaitPhoneNumber':
            //request qr
            client.invoke({
                _: "requestQrCodeAuthentication"
            });
            return React.createElement(PhoneEnter, null);
        case 'authorizationStateWaitOtherDeviceConfirmation':
            return React.createElement(PhoneEnter, { qrConfirmLink: authState.link });
    }
    return React.createElement(Load, null);
};
