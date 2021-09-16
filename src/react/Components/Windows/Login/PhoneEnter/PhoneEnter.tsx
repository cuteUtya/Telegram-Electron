import React, { useState} from 'react'
import {AccentColor, Font, SecondaryHeadingColor} from '../../../../../AppStyles';
import LoginInput from "../LoginInput";
import {AddCSSSelector} from "../../../../../AddCSSSelector";
import tgQr from "../../../../../tgqr/tg-qr";
import {useSelector} from "react-redux";
import {PhoneInput} from "./PhoneInput";
import {State} from "../../../../../Redux/AppReduxer";
import {RippleButton} from "../../../Common/RippleButton/RippleButton";

const Container = AddCSSSelector("#Container", {
    height: 480,
    width: 970,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    display: "grid",
    gridTemplateColumns: "1fr 1fr"
})

const FormContainer = AddCSSSelector("#formContainer", {
    width: 545,
    height: 480
})

AddCSSSelector("h1", {
    fontSize: 28,
})

AddCSSSelector("h2", {
    fontWeight: 500,
    fontSize: 24,
    color: SecondaryHeadingColor
})

const sendCodeBtnText = AddCSSSelector("#sendCodeBtnText", {
    fontSize: 28,
    fontWeight: "medium",
    textAlign: "center",
    color: AccentColor
})

const qrContainer = AddCSSSelector("#qrContainer", {
    width: 340,
    height: 480,
    marginLeft: 84,
    backgroundColor: "#FEFEFE",
    gridTemplateRows: "min-content",
    justifyItems: "center",
    justifyContent: "center",
    display: "grid"
})

const loginUl = AddCSSSelector("#loginUl", {
    listStyleType: "decimal"
})

const loginLi = AddCSSSelector("#LoginLi",{
    fontSize: 24
})

interface IPhoneEnterProps{
    qrConfirmLink?: string;
}

const PhoneEnter : React.FC<IPhoneEnterProps> = ({qrConfirmLink}: IPhoneEnterProps) => {
    const client = useSelector((state: State) => state.Client);
    const [QrSource, setQrSource] = useState('amogus.png');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    tgQr(qrConfirmLink, "amogus.png", false, 320).then((result) => setQrSource(result[0].src));

    return (
        <div style={{fontFamily: Font}} id={Container}>
            <div id={FormContainer}>
                <h1 style={{margin: 0}}>Sign in to Telegram</h1>
                <h2 style={{margin: 0}}>Please confirm your country and enter your phone number.</h2>
                <LoginInput description={"Country"} defaultValue={country} topMargin={"36px"}/>
                <PhoneInput OnPhoneNumberChange={(phone) => setPhoneNumber(phone)} OnCountryChange={(country) => setCountry(country)}/>
                <RippleButton buttonText={"Send code"} onChange={() => client.invoke({_: "setAuthenticationPhoneNumber", phone_number: phoneNumber})}/>
            </div>
            <div id={qrContainer}>
                <img style={{width: 320, height: 320}} src={QrSource}/>
                <h1 style={{margin: 0}}>Enter using QR code</h1>
                <ul id={loginUl}>
                    <li id={loginLi}>Open <span style={{color: AccentColor}}>Telegram</span> on your phone</li>
                    <li id={loginLi}>{"Settings > devices > Scan QR code"}</li>
                </ul>
            </div>
        </div>)
}

export default PhoneEnter;