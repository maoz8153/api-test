import request from "request-promise-native";
import { IRestService } from "./interfaces/rest.interface";


export class RestService implements IRestService {
    private path = 'api/resource';
    constructor(private remoteServer: string) { }
    async getData(): Promise<any> {
        return await request.get(this.remoteServer + this.path);
    };
    async postData(data: any): Promise<any> {
        return await request.post(this.remoteServer + this.path, { body: data, json: true });
    };
}