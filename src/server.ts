import { App } from './app';
import { RestController } from './controllers/rest/rest.controller';
import { ApplicationConfigService } from './config/services/application-config.service';
import { RestService } from './services/rest.service';
import { ServerModeService } from './services/server-mode.service';
import { ServerMode } from './config/services/enum/server.mode.enum';

const applictionConfigPath = process.env.npm_package_config_configPath || './config/config.env';
const remoteServer = process.argv[2];
const applicationConfigService = new ApplicationConfigService(applictionConfigPath, remoteServer);
const appRestService = new RestService(applicationConfigService.getRemoteServer());
const appServerModeService = new ServerModeService()
const app = new App(
  [
    new RestController(appServerModeService, applicationConfigService.getServerMode()),
  ],
  applicationConfigService.getPort(),

);

 
app.listen();