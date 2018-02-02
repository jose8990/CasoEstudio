import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Headers, Http, RequestMethod, RequestOptionsArgs, Response, URLSearchParams} from "@angular/http";

import {Cookie} from "ng2-cookies";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../environments/environment";
import {BlockUI, NgBlockUI} from "ng-block-ui";

import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import {NotificationsService} from "./notifications.service";
import {AuthService} from "./auth.service";
import {Token} from "../models/token.model";

@Injectable()
export class ApiService {
  @BlockUI() blockUI: NgBlockUI;

  constructor(private http: Http,
              private router: Router,
              private notificationService: NotificationsService,
              private translate: TranslateService,
              private authService: AuthService) {
  }

  public get(url: string, search?: URLSearchParams): Observable<any> {
    return this.request(url, {method: RequestMethod.Get, search})
      .map((response: Response) => response.json());
  }

  public post(url: string, data?: Object): Observable<any> {
    return this.request(url, {method: RequestMethod.Post}, data)
      .map((response: Response) => response.json());
  }

  public postWitchParamURL(url: string, data?: Object, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.request(url, {method: RequestMethod.Post}, data, params)
      .map((response: Response) => response.json());
  }

  public put(url: string, data?: Object): Observable<any> {
    return this.request(url, {method: RequestMethod.Put}, data)
      .map((response: Response) => response.json());
  }

  public delete(url: string): Observable<any> {
    return this.request(url, {method: RequestMethod.Delete});
  }

  public deleteList(url: string, list: any[]): Observable<any> {
    return this.request(url, {method: RequestMethod.Post}, list);
  }

  private request(url: string, options: RequestOptionsArgs, data?: Object
    , params: URLSearchParams = new URLSearchParams()): Observable<any> {

    this.blockUI.start();
    options.headers = new Headers();

    if (Cookie.get('is_auth') === 'yes') {
      options.headers.append('Authorization', `Bearer ${Cookie.get('access_token')}`);
    }

    options.headers.append('Content-Type', 'application/json; charset=utf-8;');
    options.headers.append('Accept', 'application/json');

    if (data) {
      options.body = JSON.stringify(data);
    }

    if (params) {
      options.params = params;
    }

    // TODO write specs for the refresh logic
    // TODO refactor
    return this.http.request(`${environment.api_url_resource}${url}`, options)
      .map((response: Response) => {
        this.messageFromServer(response);
        this.blockUI.stop();
        return response;
      })
      .catch(error => this.handleErrors(error, url, options, data, params));
  }

  private handleErrors(error: any, url, options, data, params) {
    if (error.status === 401) {
      return this.authService.refreshToken()
        .flatMap((token: Token) => {
          return this.request(url, options, data, params);
        });
    }

    let errorMessage = error.headers.get('X-sigquoApp-badrequest');

    if (errorMessage) {
      localStorage.setItem('message-badRequest', errorMessage);
    } else {
      errorMessage = this.translate.instant('app.base.error_conexion');
      localStorage.setItem('message-badRequest', errorMessage);
    }

    localStorage.setItem('error-status', error.status);
    localStorage.setItem('error-data', error);

    this.blockUI.stop();
    this.router.navigate(['/page/error']);
    return Observable.empty();
  }

  private messageFromServer(response: Response): void {
    const success = response.headers.get('X-sigquoApp-success');
    const info = response.headers.get('X-sigquoApp-info');
    const error = response.headers.get('X-sigquoApp-error');
    if (success) {
      this.notificationService.success(success, true);
      window.scrollTo(0, 0);
    }
    if (info) {
      this.notificationService.info(info, true);
      window.scrollTo(0, 0);
    }
    if (error) {
      this.notificationService.error(error, true);
      window.scrollTo(0, 0);
    }
  }
}
