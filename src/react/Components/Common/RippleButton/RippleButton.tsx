import React from "react";
import {AccentColor} from "../../../../AppStyles";
import {AddCSSSelector} from "../../../../AddCSSSelector";
import {Ripple} from "./index";

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

interface IRippleButtonProps {
    buttonStyle?: React.CSSProperties;
    textStyle?: React.CSSProperties;
    buttonText: string;
    rippleDuration?: number;
    rippleColor?: string;
    onChange?: (value) => any;
}

export const RippleButton : React.FC<IRippleButtonProps> = ({buttonStyle, textStyle, buttonText, rippleDuration = 1000, rippleColor = AccentColor, onChange}) => {
    return (
        <button id={sendCodeBtn} style={buttonStyle} onChange={(value) => {if(onChange != undefined) onChange(value)}}>
            <div id={sendCodeBtnText} style={textStyle}>{buttonText}</div>
            <Ripple duration={rippleDuration} color={rippleColor}/>
        </button>)
}

