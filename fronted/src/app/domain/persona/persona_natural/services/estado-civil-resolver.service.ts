import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";

import {personaNatural} from "../models";
import {estadoCivilService} from "./estado-civil.service";

@Injectable()
export class estadoCivilResolver implements Resolve<personaNatural> {
  constructor(private estadocivilService: estadoCivilService,
              private router: Router,) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {

    return this.estadocivilService.getAllEstadosCiviles()
      .map((response) => response);

  }
}
