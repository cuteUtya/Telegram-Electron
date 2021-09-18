import React from "react";
import {clickableText, container, secondaryTextLogin} from "../../Styles";
import {Sticker} from "../../../../Sticker/Sticker";
import {RippleButton} from "../../../../Common/RippleButton/RippleButton";
import {DangerColor, DangerSecondary} from "../../../../../../AppStyles";

interface IDeleteAccountProps{
    onDeleteAccountClick: () => any;
}

export const DeleteAccount: React.FC<IDeleteAccountProps> = ({onDeleteAccountClick}) => {
    return (<div className={container}>
        <Sticker path={"utya/utyaduck_dontknow.json"} loop={false} width={"256px"} height={"256px"}/>
        <div style={{width: 540}}>
            <h1 style={{textAlign: "center"}}>You have lost your account</h1>
            <h2 className={secondaryTextLogin}>You can delete your account and registration new</h2>
            <RippleButton buttonText={"Delete account"}
                          onClick={() => onDeleteAccountClick()}
                          buttonStyle={{marginTop: 36, backgroundColor: DangerSecondary}}
                          textStyle={{color: DangerColor}}/>
        </div>
    </div>)
}