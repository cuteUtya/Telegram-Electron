import React, {useState} from "react";
import {authorizationStateWaitRegistration} from "tdlib-types";
import {TermOfService} from "./TermOfService/TermOfService";

interface IRegistrationRouteProps{
    authStateWaitRegistration: authorizationStateWaitRegistration;
}

export const RegistrationRoute : React.FC<IRegistrationRouteProps> = ({authStateWaitRegistration}) => {
    const [showedTOS, setShowedTOS] = useState(false);

    return showedTOS ? null :
        <TermOfService
            termOfService={authStateWaitRegistration.terms_of_service}
            onAcceptClick={() => setShowedTOS(true)}/>
}