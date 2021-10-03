import React, {useState} from "react";
import {useSelector} from "react-redux";
import {State} from "../../../../Redux/AppReduxer";
import {Background} from "tdlib-types";
import {fullScreenDiv} from "./Styles";


interface IWallpaperBackgroundProps{
    back : Background;
}

export const WallpaperBackground: React.FC<IWallpaperBackgroundProps> = ({back}) => {
    const [path, setPath]  = useState(back.document.document.local.path);
    const client = useSelector((state: State) => state.Client);

    if(path == "")
        client.invoke({_: "downloadFile", file_id:back.document.document.id, priority: 32}).then((result) => setPath(result.local.path));

    return (
        <div id={fullScreenDiv} style={{overflow: "hidden", zIndex: -1}}>
            <img style={{width: "100%"}} src={path}/>
        </div>)
}