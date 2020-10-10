import { ServerMode } from 'config/services/enum/server.mode.enum';
import {Request, Response, Router} from 'express';
import { IRouteInitilaizer } from '../base/interfaces/route-initilaizer.interface';
 
export class RestController implements IRouteInitilaizer{
  public path = '/rest';
  public router = Router();

  public localCache: string;
  public mode: ServerMode;
 
  constructor(mode : ServerMode) {
    this.mode = mode;
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(this.path, this.get);
  }
 
  public get(request: Request, response: Response){
    if (this.mode === ServerMode.MASTER) {
      response.send(this.localCache); 
    } else {

    }
    
  }

  private async getDataFromMaster() {

  }
 
}
 