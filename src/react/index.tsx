import React from 'react'
import {Provider, useDispatch} from "react-redux";
const ReactDom = require("react-dom");
import { App } from "./Components/App/App";
import {createStore} from "redux";
import {AppReduxer, State} from "../Redux/AppReduxer";
import {AddCSSSelector} from "../AddCSSSelector";
import {Font, PanelBorderRadius} from "../AppStyles";

AddCSSSelector("body", {
    userSelect: "none",
    margin: 0
})

AddCSSSelector("*", {
    outline: "none",
    borderRadius: `${PanelBorderRadius}px`,
    fontFamily: Font
})

let store = createStore(AppReduxer, new State());

ReactDom.render(<Provider  store={store}><App/></Provider>, document.getElementById("root"));

export {store};