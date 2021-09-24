import {BackgroundFill} from "tdlib-types";
import React from "react";
import {fullScreenDiv} from "./Styles";

interface IBackgroundFillProps{
    fill: BackgroundFill;
}

export const FilledBackground: React.FC<IBackgroundFillProps> = ({fill}) => {
    if (fill._ === "backgroundFillSolid")
        return <div id={fullScreenDiv} style={{backgroundColor: `#${componentToHex(fill.color)}`}}/>
    else if (fill._ === "backgroundFillGradient")
        return <div id={fullScreenDiv}
                    style={{background: `linear-gradient(${fill.rotation_angle}deg, #${componentToHex(fill.top_color)}, ${componentToHex(fill.bottom_color)});`}}/>
    else{
        let gradient = "";
        if(fill.colors.length === 4){
            gradient = `linear-gradient(60deg, #${componentToHex(fill.colors[0])}, #${componentToHex(fill.colors[1])}), `;
            gradient += `linear-gradient(200deg, #${componentToHex(fill.colors[2])}, #${componentToHex(fill.colors[3])})`
        } else if(fill.colors.length === 3){
            gradient = `linear-gradient(60deg, #${componentToHex(fill.colors[0])}, #${componentToHex(fill.colors[1])}), `;
            gradient += `linear-gradient(200deg, #${componentToHex(fill.colors[2])}, #${componentToHex(fill.colors[0])})`
        }
        return <div id={fullScreenDiv} style={{background : gradient}}/>
    }
}

function componentToHex(dec) {
    let rr = Math.floor(dec / 65536)
    dec -= rr * 65536
    let gg = Math.floor(dec / 256)
    dec -= gg * 256
    let bb = dec
    rr = Math.min(rr, 255)

    return `${dec2hex(rr)}${dec2hex(gg)}${dec2hex(bb)}`;
}

function dec2hex(dec){
    let hex = Number(dec).toString(16)
    if(hex.length < 2)
        hex='0'+hex
    return hex
}