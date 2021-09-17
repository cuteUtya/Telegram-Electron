import React, {useState} from "react";
import {clickableText, container, secondaryTextLogin} from "../../Styles";
import {Sticker} from "../../../../Sticker/Sticker";
import LoginInput from "../../LoginInput";
import {RippleButton} from "../../../../Common/RippleButton/RippleButton";
import {DangerColor, WrongInputIndicationTimeMS} from "../../../../../../AppStyles";
import {authorizationStateWaitPassword} from "tdlib-types";
import {useSelector} from "react-redux";
import {State} from "../../../../../../Redux/AppReduxer";

interface IPasswordRecover{
    authStateWaitPass: authorizationStateWaitPassword
}

export const PasswordRecover: React.FC<IPasswordRecover> = ({authStateWaitPass}) => {
    const [inputColor, setInputColor] = useState('');
    const [code, setCode] = useState('');
    const client = useSelector((state: State) => state.Client);

    return (<div className={container}>
        <Sticker path={"utya/utyaduck_hm.json"} loop={false} width={"256px"} height={"256px"}/>
        <div style={{width: 512}}>
            <h1 style={{textAlign: "center"}}>Is this exactly your account?</h1>
            <h2 className={secondaryTextLogin}>{`A message with a security code has been sent to your mail ${authStateWaitPass.recovery_email_address_pattern}.`}</h2>
            <LoginInput description={"Security code"} inputStyle={{borderBottomColor: inputColor}} onChange={(value) => setCode(value.target.value)}/>
            <h2 className={clickableText} style={{margin: "16px 0px 0px 0px"}}
                onClick={() => {
                    //TODO return to pass enter
                }}>Remember password?</h2>
            <RippleButton buttonText={"Check code"}
                          onClick={() => {
                             client.invoke({_: "recoverAuthenticationPassword", recovery_code: code}).then(null, (reason) => {
                                 console.log(reason);
                                 setInputColor(DangerColor);
                                 setTimeout(() => setInputColor(''), WrongInputIndicationTimeMS);
                             })
                          }}/>
            <RippleButton buttonText={"Do not have access to mail?"}
                          onClick={(value) => {
                              //TODO show tips frame
                          }} buttonStyle={{marginTop: 36}}/>
        </div>
    </div>)
}