import {AddCSSSelector} from "../../../../AddCSSSelector";
import {Font, SecondaryLoginTextColor} from "../../../../AppStyles";

export const container = AddCSSSelector(".LoginContainer", {
    FontFamily: Font,
    flexDirection: "column",
    position: "relative",
    justifyContent: "center",
    display: "flex",
    top: 256,
    alignItems: "center"
})

export const secondaryTextLogin = AddCSSSelector(".LoginSecondaryTextLogin", {
    fontSize: 24,
    fontWeight: "400",
    textAlign: "center",
    color: SecondaryLoginTextColor
})