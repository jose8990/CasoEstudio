import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";

import {personaNatural} from "../models";
import {generoService} from "./genero.service";

@Injectable()
export class generoResolver implements Resolve<personaNatural> {
  constructor(private generoService: generoService,
              private router: Router,) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {

    return this.generoService.getAllGeneros()

      .map((response) => response);

  }
}
