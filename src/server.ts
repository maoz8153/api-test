import { App } from './app';
import { RestController } from './controllers/rest/rest.controller';
import { ApplicationConfigService } from './config/services/application-config.service';
import { RestService } from './services/rest.service';

const applictionConfigPath = process.env.npm_package_config_configPath || './config/config.env'
const applicationConfigService = new ApplicationConfigService(applictionConfigPath)
const appRestService = new RestService(applicationConfigService.getRemoteServer())
const app = new App(
  [
    new RestController(applicationConfigService.getServerMode(), appRestService),
  ],
  applicationConfigService.getPort()
);
 
app.listen();