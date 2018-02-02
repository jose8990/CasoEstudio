import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";

import {personaNatural} from "../models";
import {razaService} from "./raza.service";

@Injectable()
export class razaResolver implements Resolve<personaNatural> {
  constructor(private razaService: razaService,
              private router: Router,) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {

    return this.razaService.getAllRazas()
      .map((response) => response);

  }
}
