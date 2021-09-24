import React from "react";
import {useSelector} from "react-redux";
import {State} from "../../../../Redux/AppReduxer";
import Load from "../../Windows/Load/Load";
import {WallpaperBackground} from "./WallpaperBackground";
import {FilledBackground} from "./FilledBackground";

export const BackgroundRoute : React.FC = () => {
    //TODO: use dark background in dark theme
    const background = useSelector((state: State) => state.BackgroundLight);
    if (background != null) {
        switch (background.type._) {
            case "backgroundTypeWallpaper":
                return <WallpaperBackground back={background}/>

            case "backgroundTypeFill":
                return <FilledBackground fill={background.type.fill}/>

            case "backgroundTypePattern":
                return (
                    <FilledBackground fill={background.type.fill}>

                    </FilledBackground>)
        }
    }
    return <Load/>
}