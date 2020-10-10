import request from "request-promise-native";
import { IServerMode } from "./interfaces/server-mode.interface";


export class ServerModeService implements IServerMode {
    private path = 'api/resource/mode';
    constructor(private remoteServer: string) { }
    async getServerMode(): Promise<any> {
        return await request.get(this.remoteServer + this.path);
    };
}