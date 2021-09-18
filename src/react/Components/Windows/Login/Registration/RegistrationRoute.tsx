import React, {useState} from "react";
import {authorizationStateWaitRegistration} from "tdlib-types";
import {TermOfService} from "./TermOfService/TermOfService";
import {Registration} from "./Registration/Registration";
import {useSelector} from "react-redux";
import {State} from "../../../../../Redux/AppReduxer";

interface IRegistrationRouteProps{
    authStateWaitRegistration: authorizationStateWaitRegistration;
}

export const RegistrationRoute : React.FC<IRegistrationRouteProps> = ({authStateWaitRegistration}) => {
    const [showedTOS, setShowedTOS] = useState(false);
    const client = useSelector((state: State) => state.Client);


    return showedTOS ?
        <Registration
            onRegisterClick={(name, secondName) =>
                client.invoke(
                    {
                        _: "registerUser",
                        first_name: name,
                        last_name: secondName
                    })}/> :
        <TermOfService
            termOfService={authStateWaitRegistration.terms_of_service}
            onAcceptClick={() => setShowedTOS(true)}/>
}