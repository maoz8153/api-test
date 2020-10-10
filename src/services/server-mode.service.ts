import request from "request-promise-native";
import { IServerMode } from "./interfaces/server-mode.interface";


export class ServerModeService implements IServerMode {
    private path = 'api/resource/mode';
    constructor() { }
    async getServerMode(remoteServer: string): Promise<any> {
        return await request.get(remoteServer + this.path);
    };
}