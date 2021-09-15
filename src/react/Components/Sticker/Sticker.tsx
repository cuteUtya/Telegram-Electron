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
        var element = document.getElementById(randID);

        element.style.width = width;
        element.style.height = height;

        lottie.loadAnimation({
            container: element,
            renderer: render,
            loop: loop,
            autoplay: autoplay,
            path: path
        })
    })

    return (<div id={randID}/>)
}