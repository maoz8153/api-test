import { ServerMode } from 'config/services/enum/server.mode.enum';
import { Request, Response, Router } from 'express';
import { IRestService } from 'services/interfaces/rest.interface';
import { IRouteInitilaizer } from '../base/interfaces/route-initilaizer.interface';

export class RestController implements IRouteInitilaizer {
  public path = '/api/resource';
  public router = Router();

  private localCache: string;
  private mode: ServerMode;
  private restSevice: IRestService;
  private errResponce = { code: 500, message: 'error responce' };

  constructor(mode: ServerMode, service: IRestService) {
    this.mode = mode;
    this.restSevice = service;
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.get);
    this.router.post(this.path, this.post);
  }

  public async get(request: Request, response: Response) {
    if (this.mode === ServerMode.MASTER) {
      this.getRequestMaster(response);
    } else {
      try {
        const restData = await this.restSevice.getData();
        response.send(restData);
      } catch (error) {
        this.errorHandler(error, response);
      }
    }
  }

  private errorHandler(error: any, response: Response<any>) {
    if (error.code !== 500) {
      response.status(this.errResponce.code).send(this.errResponce.message);
    } else {
      this.mode = ServerMode.MASTER;
    }
  }

  private getRequestMaster(response: Response<any>) {
    if (this.localCache) {
      response.send(this.localCache);
      this.localCache = null;
    } else {
      response.status(this.errResponce.code).send(this.errResponce.message);
    }
  }

  public async post(request: Request, response: Response) {
    if (this.mode === ServerMode.MASTER) {
      this.postRequestMaster(request, response);
    } else {
      try {
        const restServiceResponce = await this.restSevice.postData(request.body);
        response.send();
      } catch (error) {
        this.errorHandler(error, response);
      }
    }
  }

  private postRequestMaster(request: Request, response: Response) {
    if (this.localCache) {
      this.localCache = request.body;
    } else {
      response.status(this.errResponce.code).send(this.errResponce.message);
    }
  }
}
