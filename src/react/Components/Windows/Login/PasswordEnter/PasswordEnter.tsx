import React, {useState} from "react";
import {Sticker} from "../../../Sticker/Sticker";
import LoginInput from "../LoginInput";
import {authenticationCodeTypeTelegramMessage, authorizationStateWaitPassword} from "tdlib-types";
import {useSelector} from "react-redux";
import {State} from "../../../../../Redux/AppReduxer";
import {clickableText, container, secondaryTextLogin} from "../Styles";
import {RippleButton} from "../../../Common/RippleButton/RippleButton";
import {DangerColor, WrongInputIndicationTimeMS} from "../../../../../AppStyles";

interface IPasswordEnterProps{
    authStateWaitPass: authorizationStateWaitPassword;
}

export const PasswordEnter : React.FC<IPasswordEnterProps> = ({authStateWaitPass}) => {
    const client = useSelector((state: State) => state.Client);
    const [inputColor, setInputColor] = useState('');

    return (
        <div className={container}>
            <Sticker path={"utya/utyaduck_secret.json"} loop={false} width={"256px"} height={"256px"}/>
            <div style={{width: 512}}>
                <h1 style={{textAlign: "center"}}>Enter your password</h1>
                <h2 className={secondaryTextLogin}>Your account is protected with an additional password.</h2>
                <LoginInput description={authStateWaitPass.password_hint} inputStyle={{borderBottomColor: inputColor}}
                            type={"password"}/>
                <h2 className={clickableText} style={{margin: "16px 0px 0px 0px"}}
                    onClick={() => {
                        if (authStateWaitPass.has_recovery_email_address) {
                            //TODO goto recovery by mail
                        } else {
                            //TODO goto tips how to recovery without mail
                        }
                    }}>Forget password?</h2>
                <RippleButton buttonText={"Check password"}
                              onClick={(value) => client.invoke({
                                  _: "checkAuthenticationPassword",
                                  password: value.target.value
                              }).then(null, () => {
                                  setInputColor(DangerColor);
                                  setTimeout(() => setInputColor(''), WrongInputIndicationTimeMS);
                              })}/>
            </div>
        </div>)
}