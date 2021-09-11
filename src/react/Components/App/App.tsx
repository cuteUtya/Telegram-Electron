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
            return <PhoneEnter></PhoneEnter>
            break;
    }


    return <Load></Load>
}
