import { App } from './app';
import { RestController } from './controllers/rest/rest.controller';
import { ApplicationConfigService } from './config/services/application-config.service';

const applictionConfigPath = process.env.npm_package_config_configPath || './config/config.env'
const applicationConfigService = new ApplicationConfigService(applictionConfigPath)
const app = new App(
  [
    new RestController(applicationConfigService.getServerMode()),
  ],
  applicationConfigService.getPort()
);
 
app.listen();