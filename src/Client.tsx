import Client, {ConfigType} from "tdl";
import {TDLib} from "tdl-tdlib-addon";

export default function InitClient(options?: ConfigType) : Promise<Client>{

    let client = new Client(new TDLib("tdjson.dll", "C:\\Users\\Timur\\electronProjects\\Electrogram\\node_modules\\tdl-tdlib-addon\\build\\Release\\td.node"), options)

    return new Promise<Client>((resolve, reject) => {
        client.connect().then(() => resolve(client));
    });
}