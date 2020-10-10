export interface IRestService {
    getData(): Promise<any>;
    postData(data: any): Promise<any>;
}