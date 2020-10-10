export interface IServerMode {
    getServerMode(server: string): Promise<any>;
}