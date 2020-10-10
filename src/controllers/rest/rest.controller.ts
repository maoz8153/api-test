import { ServerMode } from 'config/services/enum/server.mode.enum';
import {Request, Response, Router} from 'express';
import { IRestService } from 'services/interfaces/rest.interface';
import { IRouteInitilaizer } from '../base/interfaces/route-initilaizer.interface';
 
export class RestController implements IRouteInitilaizer{
  public path = '/rest';
  public router = Router();

  public localCache: string;
  public mode: ServerMode;
  private restSevice: IRestService;
 
  constructor(mode : ServerMode, service : IRestService) {
    this.mode = mode;
    this.restSevice = service;
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(this.path, this.get);
  }
 
  public async get(request: Request, response: Response){
    if (this.mode === ServerMode.MASTER) {
      response.send(this.localCache); 
    } else {
      try {
        const restData = await this.restSevice.getData();
        response.send(restData); 
      } catch (error) {
       console.log(error);
      }
    }
  }

  public async post(request: Request, response: Response){
    if (this.mode === ServerMode.MASTER) {
      this.localCache = request.body;
    } else {
      try {
        const restServiceResponce = await this.restSevice.postData(request.body);
        response.send(); 
    } catch (error) {
        console.log(error);
     }
    }
  }

 
}
 