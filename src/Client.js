import Client from "tdl";
import { TDLib } from "tdl-tdlib-addon";
export default function InitClient() {
    let client = new Client(new TDLib("tdjson.dll", "C:\\Users\\Timur\\electronProjects\\Electrogram\\node_modules\\tdl-tdlib-addon\\build\\Release\\td.node"), {
        apiId: 6627546,
        apiHash: "7c84903108b41b3872080707a6da6ad6",
    });
    return new Promise((resolve, reject) => {
        client.connect().then(() => resolve(client));
    });
}
