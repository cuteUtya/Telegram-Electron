import React, {useEffect, useState} from "react";
import {AddCSSSelector} from "../../../../../AddCSSSelector";
import {
    DangerColor,
    Font,
    InputBottomLineColor,
    SecondaryLoginTextColor,
    WrongInputIndicationTimeMS
} from "../../../../../AppStyles";
import LoginInput from "../LoginInput";
import {authenticationCodeInfo, authenticationCodeTypeSms, authenticationCodeTypeTelegramMessage} from "tdlib-types"
import {useSelector} from "react-redux";
import {State} from "../../../../../Redux/AppReduxer";
import {Sticker} from "../../../Sticker/Sticker";
import {container, secondaryTextLogin} from "../Styles";

AddCSSSelector(`.${container} > *`, {
    marginBottom: 18
})

interface ICodeEnterProps{
    codeInfo: authenticationCodeInfo;
}

export const CodeEnter : React.FC<ICodeEnterProps> = ({codeInfo})  => {
    const client = useSelector((state: State) => state.Client);
    const [inputColor, setInputColor] = useState('');

    return (
        <div className={container}>
            <Sticker path={"utya/utyaduck_sendAsMessage.json"} loop={false} width={"256px"} height={"256px"}/>
            <h1>{codeInfo.phone_number}</h1>
            <h2 className={secondaryTextLogin}>We have sent you a message in Telegram with the code.</h2>
            <LoginInput description={"Code"} inputStyle={{borderBottomColor: inputColor}} onChange={(value) => {
                let codeLength = 0;
                switch (codeInfo.type._) {
                    case "authenticationCodeTypeTelegramMessage":
                        codeLength = (codeInfo.type as authenticationCodeTypeTelegramMessage).length;//authorizationStateWaitCode
                        break;
                    case "authenticationCodeTypeSms":
                        codeLength = (codeInfo.type as authenticationCodeTypeSms).length
                        break;
                }

                if (value.target.value.length === codeLength)
                    client.invoke({
                        _: "checkAuthenticationCode",
                        code: value.target.value
                    }).then(null, () => {
                        setInputColor(DangerColor);
                        setTimeout(() => setInputColor(''), WrongInputIndicationTimeMS)
                    });
            }}/>
        </div>);
}