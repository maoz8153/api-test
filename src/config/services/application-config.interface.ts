import { ServerMode } from "./enum/server.mode.enum";

export interface IApplicationConfigService {
    getPort():number;
    getMode():string;
    getServerMode(): ServerMode;
    getRemoteServer():string;
}