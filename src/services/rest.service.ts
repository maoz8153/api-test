import request from "request-promise-native";
import { IRestService } from "./interfaces/rest.interface";


export class RestService implements IRestService{
    constructor(private remoteServer: string) {}
    async getData(): Promise<any> {
        return await request.get(this.remoteServer );
    };
    async postData(data: any): Promise<any> {
        return await request.post(this.remoteServer , { body: data, json: true });
    };
}