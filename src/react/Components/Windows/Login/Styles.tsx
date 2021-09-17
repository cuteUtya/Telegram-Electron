import {AddCSSSelector} from "../../../../AddCSSSelector";
import {AccentColor, Font, SecondaryLoginTextColor} from "../../../../AppStyles";

export const container = AddCSSSelector(".LoginContainer", {
    display: "flex",
    FontFamily: Font,
    flexDirection: "column",
    position: "absolute",
    alignItems: "center",
    top: "50%",
    left: "50%",
    transform : "translate(-50%, -50%)"
})

export const secondaryTextLogin = AddCSSSelector(".LoginSecondaryTextLogin", {
    fontSize: 24,
    fontWeight: "400 nonPX",
    textAlign: "center",
    color: SecondaryLoginTextColor
})

export const clickableText = AddCSSSelector(".LoginClickableText", {
    textAlign: "left",
    color: AccentColor,
    fontWeight: "normal"
})

AddCSSSelector(`.${clickableText}:hover`, {
    textDecoration: "underline"
})