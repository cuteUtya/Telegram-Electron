import React, { useState } from 'react';
import { AccentColor, Font, SecondaryHeadingColor } from '../../../../../AppStyles';
import LoginInput from "../LoginInput";
import { AddCSSSelector } from "../../../../../AddCSSSelector";
import { Ripple } from "../../../RippleButton";
import tgQr from "../../../../../tgqr/tg-qr";
import { useDispatch } from "react-redux";
import { OpenNewClientWithPhoneNumber } from "../../../../../Redux/Action";
import { PhoneInput } from "./PhoneInput";
const Container = AddCSSSelector("#Container", {
    height: 480,
    width: 970,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    display: "grid",
    gridTemplateColumns: "1fr 1fr"
});
const FormContainer = AddCSSSelector("#formContainer", {
    width: 545,
    height: 480
});
AddCSSSelector("h1", {
    fontSize: 28,
});
AddCSSSelector("h2", {
    fontWeight: 500,
    fontSize: 24,
    color: SecondaryHeadingColor
});
const sendCodeBtn = AddCSSSelector("#sendCodeBtn", {
    position: "relative",
    width: "100%",
    height: 68,
    borderRadius: 16,
    border: "none",
    backgroundColor: "transparent",
    marginTop: 56
});
const sendCodeBtnText = AddCSSSelector("#sendCodeBtnText", {
    fontSize: 28,
    fontWeight: "medium",
    textAlign: "center",
    color: AccentColor
});
const qrContainer = AddCSSSelector("#qrContainer", {
    width: 340,
    height: 480,
    marginLeft: 84,
    backgroundColor: "#FEFEFE",
    gridTemplateRows: "min-content",
    justifyItems: "center",
    justifyContent: "center",
    display: "grid"
});
const loginUl = AddCSSSelector("#loginUl", {
    listStyleType: "decimal"
});
const loginLi = AddCSSSelector("#LoginLi", {
    fontSize: 24
});
const PhoneEnter = ({ qrConfirmLink }) => {
    const [QrSource, setQrSource] = useState('amogus.png');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    tgQr(qrConfirmLink, "amogus.png", false, 320).then((result) => setQrSource(result[0].src));
    const dispatch = useDispatch();
    return (React.createElement("div", { style: { fontFamily: Font }, id: Container },
        React.createElement("div", { id: FormContainer },
            React.createElement("h1", { style: { margin: 0 } }, "Sign in to Telegram"),
            React.createElement("h2", { style: { margin: 0 } }, "Please confirm your country and enter your phone number."),
            React.createElement(LoginInput, { description: "Country", defaultValue: country, topMargin: "36px" }),
            React.createElement(PhoneInput, { OnPhoneNumberChange: (phone) => setPhoneNumber(phone), OnCountryChange: (country) => setCountry(country) }),
            React.createElement("button", { id: sendCodeBtn, onClick: () => dispatch({ type: OpenNewClientWithPhoneNumber, phoneNumber: phoneNumber }) },
                React.createElement("div", { id: sendCodeBtnText }, "Send code"),
                React.createElement(Ripple, { duration: 1000, color: AccentColor }))),
        React.createElement("div", { id: qrContainer },
            React.createElement("img", { style: { width: 320, height: 320 }, src: QrSource }),
            React.createElement("h1", { style: { margin: 0 } }, "Enter using QR code"),
            React.createElement("ul", { id: loginUl },
                React.createElement("li", { id: loginLi },
                    "Open ",
                    React.createElement("span", { style: { color: AccentColor } }, "Telegram"),
                    " on your phone"),
                React.createElement("li", { id: loginLi }, "Settings > devices > Scan QR code")))));
};
export default PhoneEnter;
