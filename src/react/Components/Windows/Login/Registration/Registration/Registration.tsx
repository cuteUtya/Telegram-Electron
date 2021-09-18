import React, {useState} from "react";
import {clickableText, container, secondaryTextLogin} from "../../Styles";
import {Sticker} from "../../../../Sticker/Sticker";
import LoginInput from "../../LoginInput";
import {RippleButton} from "../../../../Common/RippleButton/RippleButton";
import {DangerColor, WrongInputIndicationTimeMS} from "../../../../../../AppStyles";

interface IRegistrationProps{
    onRegisterClick : (name: string, secondName: string) => any;
}

export const Registration: React.FC<IRegistrationProps> = ({onRegisterClick}) => {
    const [inputNameColor, setNameInputColor] = useState('');

    const [name, setName] = useState('');
    const [secondName, setSecondName] = useState('');

    return (
        <div className={container}>
            <Sticker path={"utya/utyaduck_hello.json"} loop={false} width={"256px"} height={"256px"}/>
            <div style={{width: 512}}>
                <h1 style={{textAlign: "center"}}>Welcome to Telegram</h1>
                <h2 className={secondaryTextLogin}>Enter your name or pseudonym.</h2>
                <LoginInput description={"Name"}
                            inputStyle={{borderBottomColor: inputNameColor}}
                            onChange={(value) => setName(value.target.value)}/>
                <LoginInput description={"Second name (optional)"}
                            onChange={(value) => setSecondName(value.target.value)}/>
                <RippleButton buttonText={"Register"} onClick={() => {
                    if(name.length < 1) {
                        setNameInputColor(DangerColor);
                        setTimeout(() => setNameInputColor(''), WrongInputIndicationTimeMS);
                    } else
                        onRegisterClick(name, secondName);
                }}/>
            </div>
        </div>)
}