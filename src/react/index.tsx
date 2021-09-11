import React from 'react'
import {Provider, useDispatch} from "react-redux";
const ReactDom = require("react-dom");
import { App } from "./Components/App/App";
import {createStore} from "redux";
import {AppReduxer, State} from "../Redux/AppReduxer";
import {AddCSSSelector} from "../AddCSSSelector";

AddCSSSelector("body", {
    userSelect: "none"
})

let store = createStore(AppReduxer, new State());

ReactDom.render(<Provider  store={store}><App/></Provider>, document.getElementById("root"));

export {store};