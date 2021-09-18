import React from "react";
import { container, secondaryTextLogin} from "../../Styles";
import {RippleButton} from "../../../../Common/RippleButton/RippleButton";
import {AccentColor, Font} from "../../../../../../AppStyles";
import {termsOfService} from "tdlib-types";

interface ITermOfServiceProps{
    termOfService: termsOfService;
    onAcceptClick: () => any;
}

export const TermOfService: React.FC<ITermOfServiceProps> = ({termOfService, onAcceptClick}) => {
    return (<div className={container}>
        <div style={{width: 512}}>
            <h1 style={{textAlign: "center"}}>Before using</h1>
            <h2 className={secondaryTextLogin}>Read and accepting with <span
                style={{color: AccentColor, fontWeight: "bold"}}>Telegram</span> Terms of Service</h2>
            <pre>
                <h2 className={secondaryTextLogin}
                style={{whiteSpace: "pre-wrap", fontFamily: Font, textAlign: "left"}}>
                    {termOfService.text.text}
                </h2>
            </pre>

            <RippleButton buttonText={"Accept"}
                          onClick={() => onAcceptClick()}
                          buttonStyle={{marginTop: 36}}/>
        </div>
    </div>)
}