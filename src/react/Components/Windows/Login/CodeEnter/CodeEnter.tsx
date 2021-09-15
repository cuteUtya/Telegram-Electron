import React, {useEffect} from "react";
import {AddCSSSelector} from "../../../../../AddCSSSelector";
import {Font, SecondaryLoginTextColor} from "../../../../../AppStyles";
import LoginInput from "../LoginInput";
import {authenticationCodeInfo, authenticationCodeTypeTelegramMessage} from "tdlib-types"
import {useSelector} from "react-redux";
import {State} from "../../../../../Redux/AppReduxer";
import {Sticker} from "../../../Sticker/Sticker";

const container = AddCSSSelector(".CodeEnterContainer", {
    FontFamily: Font,
    flexDirection: "column",
    position: "relative",
    justifyContent: "center",
    display: "flex",
    top: 256,
    alignItems: "center"
})

const secondaryTextLogin = AddCSSSelector(".LoginSecondaryTextLogin", {
    fontSize: 24,
    fontWeight: "400",
    textAlign: "center",
    color: SecondaryLoginTextColor
})

AddCSSSelector(`.${container} > *`, {
    marginBottom: 18
})

interface ICodeEnterProps{
    codeInfo: authenticationCodeInfo;
}

export const CodeEnter : React.FC<ICodeEnterProps> = ({codeInfo})  => {
    const client = useSelector((state: State) => state.Client);


    return(
        <div className={container}>
            <Sticker path={"utya/utyaduck_sendAsMessage.json"} loop={false} width={"256px"} height={"256px"}/>
            <h1>{codeInfo.phone_number}</h1>
            <h2 className={secondaryTextLogin}>We have sent you a message in Telegram with the code.</h2>
            <LoginInput description={"Code"} onChange={(value) => {
                switch (codeInfo.type._){
                    case "authenticationCodeTypeTelegramMessage":
                        if(value.target.value.length === (codeInfo.type as authenticationCodeTypeTelegramMessage).length)
                            client.invoke({_: "checkAuthenticationCode", code: value.target.value});
                        break;
                }
                    }}/>
        </div>);
}