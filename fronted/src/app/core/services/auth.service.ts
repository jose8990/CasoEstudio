import {Injectable} from "@angular/core";

import {Headers, Http, RequestMethod, RequestOptions, RequestOptionsArgs, URLSearchParams} from "@angular/http";
import {NgxPermissionsService, NgxRolesService} from "ngx-permissions";
import {Cookie} from "ng2-cookies";

import {Observable} from "rxjs/Rx";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import {environment} from "../../../environments/environment";

import {Token, User} from "../models";


@Injectable()
export class AuthService {
  private token: Token;

  public currentUserSubject: BehaviorSubject<User> = new BehaviorSubject(new User());
  public currentUser$: Observable<User> = this.currentUserSubject.asObservable();

  constructor(private _http: Http,
              private roleService: NgxRolesService,
              private permissionsService: NgxPermissionsService,) {
  }

  public login(loginData: { email: string, password: string }): Promise<boolean> {
    return this.accessToken(loginData.email, loginData.password)
      .flatMap((token: Token) => {
        this.loadUserIfIsAutenticate();
        return Observable.of(true);
      }).catch(error => {
        return Observable.of(false);
      })
      .toPromise();
  }

  public logout(): void {
    // mandar a eliminjar el refresh token
    Cookie.set('is_auth', 'no');
    Cookie.delete('access_token');
    Cookie.delete('refresh_token');
    this.roleService.flushRoles();

    this.currentUserSubject.next(new User());
  }

  public loadUserIfIsAutenticate(): Promise<User> {
    /*if (this.isAuthenticated()) {
      const options = <RequestOptionsArgs>{};
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json; charset=utf-8;');
      options.headers.append('Accept', 'application/json');
      options.headers.append('Authorization', `Bearer ${Cookie.get('access_token')}`);

      const url = environment.api_url_server + '/autenticateuser';

      return this._http.request(url, options)
        .map(response => response.json())
        .map((user: User) => {
          this.setRolesWithAutority(user.authorities);
          this.currentUserSubject.next(user);
        })
        .catch((error) => {
          if (error.status === 401) {
            /**
             * Actualizo el token y mando de nuevo a obtener el
             * usuario autenticado con el access_token de la cookie
             */
        /*    return this.refreshToken()
              .flatMap((token: Token) => {
                options.headers.set('Authorization', `Bearer ${Cookie.get('access_token')}`)
                return this._http.request(url, options)
                  .map(response => response.json())
                  .map((user: User) => {
                    this.setRolesWithAutority(user.authorities);
                    this.currentUserSubject.next(user);
                  });
              })
              .catch(() => {
                this.logout();
                return Observable.empty();
              }).toPromise();
          }
          return Observable.throw(error);
        }).toPromise();
    }*/

    return Observable.empty().toPromise();
  }

  public getCurrentUser(): User {
    return this.currentUserSubject.getValue();
  }

  public isAuthenticated(): boolean {
    return true;//Cookie.get('is_auth') === 'yes' || false;
  }

  public accessToken(username: string, password: string): Observable<Token> {
    const options = <RequestOptions>{};
    options.headers = new Headers();
    options.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    options.headers.append('Accept', 'application/json');
    options.headers.append('Authorization', 'Basic ' + btoa('1:jose'));

    const data = new URLSearchParams();
    data.append('username', 'jose');
    data.append('password', 'jose');
    data.append('grant_type', 'jose');
    data.append('client_id', '1');
    options.body = data.toString();

    return this.getToken(options);
  }

  public refreshToken(): Observable<Token> {
    const options = <RequestOptionsArgs>{};
    options.headers = new Headers();
    options.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    options.headers.append('Accept', 'application/json');
    options.headers.append('Authorization', 'Basic ' + btoa('1:jose'));

    const data = new URLSearchParams();
    data.append('refresh_token', Cookie.get('refresh_token'));
    data.append('grant_type', 'refresh_token');
    options.body = data.toString();

    return this.getToken(options);
  }

  private getToken(options: RequestOptionsArgs): Observable<Token> {
    options.method = RequestMethod.Post;
    //const url = environment.api_url_server + environment.token_endpoint;

    var token: Token = {
      access_token: '3434h3j4h3j4h3j4hjh',
      expires_in: 10000,
      jti: 'josearmando',
      refresh_token: '3434h3j4h3j4h3j4hjh',
      scope: 'jose',
      token_type: 'token',
    }

    this.saveToken(token);
    return Observable.of(token);
  }

  private saveToken(token: Token): void {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.token = token;
    Cookie.set('is_auth', 'yes');
    Cookie.set('access_token', token.access_token, expireDate);
    Cookie.set('refresh_token', token.refresh_token);
  }

  private setRolesWithAutority(roles): void {
    Object.keys(roles).map((key) => {
      const permission = roles[key];
      this.roleService.addRole(permission.authority, []);
    });
  }
}
