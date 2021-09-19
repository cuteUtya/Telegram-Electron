import React, {CSSProperties, useEffect, useState} from "react";
import {AddCSSSelector} from "../../../../AddCSSSelector";
import {DangerColor, InputBackgroundColor, InputBorderColor, InputDescriptionColor} from "../../../../AppStyles";
import {fileTypeAnimation, phoneNumberInfo} from "tdlib-types";
import {useSelector} from "react-redux";
import {State} from "../../../../Redux/AppReduxer";


const inpHeading = AddCSSSelector("#InputHeading", {
    fontSize: 24,
    fontWeight: "normal",
    color: InputDescriptionColor
})

const formInput = AddCSSSelector("#FormInput", {
    width: "100%",
    height: 48,
    fontSize: 28,
    backgroundColor: InputBackgroundColor,
    border: `solid 2px ${InputBorderColor}`,
    transition: "border-bottom-color 0.3s ease-in",
    borderRadius: 12,
    padding: 24,
    paddingLeft: 8,
    boxSizing: "border-box"

})

AddCSSSelector("#FormInput:focus",{
    outline: "none"
})

interface ILoginInputProps{
    description: string;
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => any;
    topMargin?: string;
    defaultValue? : string;
    type?: string;
    inputStyle? : CSSProperties
}

const LoginInput : React.FC<ILoginInputProps> = ({description, onChange, topMargin, defaultValue, type = "text", inputStyle}) => {
    return (
        <div>
            <h3 id={inpHeading} style={{margin: 0, marginTop: topMargin, marginBottom: 4}}>{description}</h3>
            <input id={formInput} style={inputStyle} value={defaultValue}
                   onChange={(value) => {
                if (onChange != undefined) onChange(value)
            }}
            type={type}/>
        </div>)
}

export default LoginInput;