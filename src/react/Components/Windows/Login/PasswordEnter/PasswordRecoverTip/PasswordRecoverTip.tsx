import React, {useState} from "react";
import {clickableText, container, secondaryTextLogin} from "../../Styles";
import {Sticker} from "../../../../Sticker/Sticker";
import LoginInput from "../../LoginInput";
import {RippleButton} from "../../../../Common/RippleButton/RippleButton";
import {DangerColor, WrongInputIndicationTimeMS} from "../../../../../../AppStyles";
import {authorizationStateWaitPassword} from "tdlib-types";
import {useSelector} from "react-redux";
import {State} from "../../../../../../Redux/AppReduxer";

interface IPasswordRecoverTip{
    onBackToLastWindowClick: () => any;
}

export const PasswordRecoverTip: React.FC<IPasswordRecoverTip> = ({onBackToLastWindowClick}) => {
    return (<div className={container}>
        <Sticker path={"utya/utyaduck_hm.json"} loop={false} width={"256px"} height={"256px"}/>
        <div style={{width: 512}}>
            <h1 style={{textAlign: "center"}}>Have access to account?</h1>
            <h2 className={secondaryTextLogin}>If you have access to your Telegram account, you can change your password, even if you have not specified your recovery email.</h2>
            <RippleButton buttonText={"Do not have account access?"}
                          onClick={(value) => {
                              //TODO show tips frame
                          }} buttonStyle={{marginTop: 36}}/>
            <h2 className={clickableText} style={{margin: "16px 0px 0px 0px"}}
                onClick={() => onBackToLastWindowClick()}>Back to last window</h2>
        </div>
    </div>)
}