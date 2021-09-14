import React from "react";
import { AddCSSSelector } from "../../../../AddCSSSelector";
import { InputDescriptionColor } from "../../../../AppStyles";
const inpHeading = AddCSSSelector("#InputHeading", {
    fontSize: 24,
    fontWeight: "normal",
    color: InputDescriptionColor
});
const formInput = AddCSSSelector("#FormInput", {
    width: "100%",
    height: 58,
    fontSize: 36,
    border: "none",
    borderBottom: "solid 3px #D5DCE1"
});
AddCSSSelector("#FormInput:focus", {
    outline: "none"
});
const LoginInput = ({ description, onChange, topMargin, defaultValue }) => {
    return (React.createElement("div", null,
        React.createElement("h3", { id: inpHeading, style: { margin: 0, marginTop: topMargin } }, description),
        React.createElement("input", { id: formInput, value: defaultValue, onChange: (value) => onChange(value) })));
};
export default LoginInput;
