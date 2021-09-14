import React from "react";
import LoginInput from "../LoginInput";
import { useSelector } from "react-redux";
export const PhoneInput = ({ OnPhoneNumberChange, OnCountryChange }) => {
    const client = useSelector((state) => state.Client);
    let lastInputCount = 0;
    let lastCountry = '';
    function FormatPhone(value, phoneNumberInfo) {
        if (lastInputCount < value.target.value.length) {
            let formattedPhone = `+${phoneNumberInfo.country_calling_code} ${phoneNumberInfo.formatted_phone_number.split('-').join('')}`;
            //remove unnecessary spaces in end of string
            for (let i = formattedPhone.length - 1; i > 0; i--) {
                if (formattedPhone[i] == ' ')
                    formattedPhone = formattedPhone.slice(0, i);
                else
                    break;
            }
            let country = phoneNumberInfo.country == undefined ? '' : phoneNumberInfo.country.name;
            if (country != lastCountry) {
                lastCountry = country;
                if (OnCountryChange != undefined)
                    OnCountryChange(country);
            }
            if (OnPhoneNumberChange != undefined)
                OnPhoneNumberChange(value.target.value);
            value.target.value = formattedPhone;
        }
        lastInputCount = value.target.value.length;
    }
    return (React.createElement(LoginInput, { description: "Phone number", topMargin: "48px", onChange: (value) => {
            client.invoke({
                _: "getPhoneNumberInfo",
                phone_number_prefix: value.target.value
            }).then((result) => FormatPhone(value, result));
        } }));
};
