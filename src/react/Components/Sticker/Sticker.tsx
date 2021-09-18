import React, {useEffect} from "react";
import lottie from "lottie-web";

interface IStickerProps<T extends 'svg' | 'canvas' | 'html' = 'svg'>{
    render?: T;
    loop?: boolean;
    autoplay?: boolean;
    path: string;
    width: string;
    height: string;
}

export const Sticker: React.FC<IStickerProps> = ({render = 'svg', loop= true, autoplay = true, path, width, height}) => {
    const randID = Math.random().toString() + new Date().toString() + path;
    useEffect(() => {
        let element = document.getElementById(randID);
        element.innerHTML = '';
        element.style.width = width;
        element.style.height = height;

        lottie.loadAnimation({
            container: element,
            renderer: render,
            loop: loop,
            autoplay: autoplay,
            path: path
        })
    }, [])

    //#IsJustEmptyDiv to make sure the size is correct without sticker
    return (
        <div id={randID}>
            <div id={"#IsJustEmptyDiv"} style={{width: width, height: height}}/>
        </div>)
}