import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";

import {personaNatural} from "../models";
import {paisResidenciaService} from "./pais-residencia.service";


@Injectable()
export class paisResidenciaResolver implements Resolve<personaNatural> {
  constructor(private pais_ResidenciaService: paisResidenciaService,
              private router: Router,) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {

    return this.pais_ResidenciaService.getAll()
      .map((response) => response);
  }
}
