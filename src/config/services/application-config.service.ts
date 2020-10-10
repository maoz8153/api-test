import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { IApplicationConfigService } from './application-config.interface';
import { ServerMode } from './enum/server.mode.enum';

export class ApplicationConfigService implements IApplicationConfigService {
  private envConfig: { [key: string]: string };
  private serverList = {
    SERVER1 : 'http://ec2-18-184-130-111.eu-central-1.compute.amazonaws.com',
    SERVER2 : 'http://ec2-18-184-17-86.eu-central-1.compute.amazonaws.com'
  }

  constructor(filePath: string, server?: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    if (server) {
      this.envConfig.REMOTE_SERVER = this.serverList[server];
    }
    console.log(JSON.stringify(this.envConfig));
  }

  public getPort():number {
    return parseInt(this.envConfig.PORT) || 5000;
  }

  public getMode():string {
    return this.envConfig.ENV_MODE || 'production';
  }

  public getServerMode():ServerMode {
    return ServerMode[this.envConfig.SERVER_MODE] || ServerMode.SLAVE;
  }

  public getRemoteServer():string {
    return this.envConfig.REMOTE_SERVER || 'http://localhost';
  }

  public setServerMode(mode: string) {
    this.envConfig.SERVER_MODE = mode;
  }
}