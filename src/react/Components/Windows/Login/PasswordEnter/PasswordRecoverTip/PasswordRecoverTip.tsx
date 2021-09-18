import React from "react";
import {clickableText, container, secondaryTextLogin} from "../../Styles";
import {Sticker} from "../../../../Sticker/Sticker";
import {RippleButton} from "../../../../Common/RippleButton/RippleButton";

interface IPasswordRecoverTipProps{
    onBackToLastWindowClick: () => any;
    onDoNotHaveAccountAccessClick: () => any;
}

export const PasswordRecoverTip: React.FC<IPasswordRecoverTipProps> = ({onBackToLastWindowClick, onDoNotHaveAccountAccessClick}) => {
    return (<div className={container}>
        <Sticker path={"utya/utyaduck_hm.json"} loop={false} width={"256px"} height={"256px"}/>
        <div style={{width: 512}}>
            <h1 style={{textAlign: "center"}}>Have access to account?</h1>
            <h2 className={secondaryTextLogin}>If you have access to your Telegram account, you can change your password, even if you have not specified your recovery email.</h2>
            <RippleButton buttonText={"Do not have account access?"}
                          onClick={() => onDoNotHaveAccountAccessClick()}
                          buttonStyle={{marginTop: 36}}/>
            <h2 className={clickableText} style={{margin: "16px 0px 0px 0px"}}
                onClick={() => onBackToLastWindowClick()}>Back to last window</h2>
        </div>
    </div>)
}