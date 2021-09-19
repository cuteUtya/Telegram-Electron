import React from "react";
import {AccentColor, ButtonAccentColor} from "../../../../AppStyles";
import {AddCSSSelector} from "../../../../AddCSSSelector";
import {Ripple} from "./index";

const sendCodeBtn = AddCSSSelector("#sendCodeBtn", {
    position: "relative",
    width: "100%",
    height: 56,
    borderRadius: 16,
    border: "none",
    backgroundColor: ButtonAccentColor,
    marginTop: 48
})


const sendCodeBtnText = AddCSSSelector("#sendCodeBtnText", {
    fontSize: 28,
    fontWeight: "400",
    textAlign: "center",
    color: AccentColor
})

interface IRippleButtonProps {
    buttonStyle?: React.CSSProperties;
    textStyle?: React.CSSProperties;
    buttonText: string;
    rippleDuration?: number;
    rippleColor?: string;
    onClick?: (value) => any;
}

export const RippleButton : React.FC<IRippleButtonProps> = ({buttonStyle, textStyle, buttonText, rippleDuration = 1000, rippleColor = "white", onClick}) => {
    return (
        <button id={sendCodeBtn} style={buttonStyle} onClick={(value) => onClick(value)!}>
            <div id={sendCodeBtnText} style={textStyle}>{buttonText}</div>
            <Ripple duration={rippleDuration} color={rippleColor}/>
        </button>)
}
