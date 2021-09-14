import React, { useState} from 'react'
import {AccentColor, Font, SecondaryHeadingColor} from '../../../../../AppStyles';
import LoginInput from "../LoginInput";
import {AddCSSSelector} from "../../../../../AddCSSSelector";
import {Ripple} from "../../../RippleButton";
import tgQr from "../../../../../tgqr/tg-qr";
import {useDispatch, useSelector, useStore} from "react-redux";
import {OpenNewClientWithPhoneNumber} from "../../../../../Redux/Action";
import {PhoneInput} from "./PhoneInput";

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

const sendCodeBtn = AddCSSSelector("#sendCodeBtn", {
    position: "relative",
    width: "100%",
    height: 68,
    borderRadius: 16,
    border: "none",
    backgroundColor: "transparent",
    marginTop: 56
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
    const [QrSource, setQrSource] = useState('amogus.png');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    tgQr(qrConfirmLink, "amogus.png", false, 320).then((result) => setQrSource(result[0].src));

    const dispatch = useDispatch();

    return (
        <div style={{fontFamily: Font}} id={Container}>
            <div id={FormContainer}>
                <h1 style={{margin: 0}}>Sign in to Telegram</h1>
                <h2 style={{margin: 0}}>Please confirm your country and enter your phone number.</h2>
                <LoginInput description={"Country"} defaultValue={country} topMargin={"36px"}/>
                <PhoneInput OnPhoneNumberChange={(phone) => setPhoneNumber(phone)} OnCountryChange={(country) => setCountry(country)}/>
                <button id={sendCodeBtn}
                        onClick={() => dispatch({type: OpenNewClientWithPhoneNumber, phoneNumber: phoneNumber})}>
                    <div id={sendCodeBtnText}>Send code</div>
                    <Ripple duration={1000} color={AccentColor}/>
                </button>
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