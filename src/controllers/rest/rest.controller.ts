import {Request, Response, Router} from 'express';
import { IRouteInitilaizer } from '../base/interfaces/route-initilaizer.interface';
 
export class RestController implements IRouteInitilaizer{
  public path = '/rest';
  public router = Router();
 
  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(this.path, this.get);
  }
 
  public get(request: Request, response: Response){
    response.send("REST api");
  }
 
}
 