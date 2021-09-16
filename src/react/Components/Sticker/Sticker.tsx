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
    console.log("draw sticker");
    const randID = Math.random().toString() + new Date().toString() + path;
    useEffect(() => {

        let element = document.getElementById(randID);

        if(element.childElementCount == 0) {
            element.style.width = width;
            element.style.height = height;

            lottie.loadAnimation({
                container: element,
                renderer: render,
                loop: loop,
                autoplay: autoplay,
                path: path
            })
        }
    })

    return (<div id={randID}/>)
}