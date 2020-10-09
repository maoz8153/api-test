import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { IApplicationConfigService } from './application-config.interface';

export class ApplicationConfigService implements IApplicationConfigService {
  private envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  public getPort():number {
    return parseInt(this.envConfig.PORT) || 5000;
  }

  public getMode():string {
    return this.envConfig.ENV_MODE || 'production';
  }
}