import { Request, Response, Router } from 'express';
import { ServerMode } from '../../config/services/enum/server.mode.enum';
import { RestService } from '../../services/rest.service';
import { IRouteInitilaizer } from '../base/interfaces/route-initilaizer.interface';

export class RestController implements IRouteInitilaizer {
  public path = '/api/resource';
  public router = Router();

  private localCache = {};
  private mode: ServerMode;
  private restSevice: RestService;
  private errResponce = { code: 500, message: 'error responce' };
  private sucssesRespoce = 'operation successful';

  constructor(restSevice: RestService, mode: ServerMode) {
    this.restSevice = restSevice;
    this.mode = mode;
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.get.bind(this));
    this.router.post(this.path, this.post.bind(this));
    this.router.get(this.path + `/mode`, this.getMode.bind(this));
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

  public getMode(request: Request, response: Response) {
    response.send(this.mode);
  }

  private postRequestMaster(request: Request, response: Response) {
    if (Object.keys(this.localCache).length === 0) {
      this.localCache = request.body;
      response.send(this.sucssesRespoce);
    } else {
      response.status(this.errResponce.code).send(this.errResponce.message);
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
    if (Object.keys(this.localCache).length > 0) {
      response.send(this.localCache);
      this.localCache = {};
    } else {
      response.status(this.errResponce.code).send(this.errResponce.message);
    }
  }
}
