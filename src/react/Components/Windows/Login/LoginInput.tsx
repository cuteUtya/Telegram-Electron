import React from "react";
import {AddCSSSelector} from "../../../../AddCSSSelector";
import {InputDescriptionColor} from "../../../../AppStyles";
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
    height: 58,
    fontSize: 36,
    border: "none",
    borderBottom: "solid 3px #D5DCE1"
})

AddCSSSelector("#FormInput:focus",{
    outline: "none"
})

interface ILoginInputProps{
    description: string;
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => any;
    topMargin: string;
    defaultValue? : string;
}

const LoginInput : React.FC<ILoginInputProps> = ({description, onChange, topMargin, defaultValue}) =>{
    return (
        <div>
            <h3 id={inpHeading} style={{margin: 0, marginTop: topMargin}}>{description}</h3>
            <input id={formInput} value={defaultValue} onChange={(value)  => onChange(value)}/>
        </div>)
}

export default LoginInput;