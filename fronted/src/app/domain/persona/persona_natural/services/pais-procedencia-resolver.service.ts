import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";

import {personaNatural} from "../models";
import {paisProcedenciaService} from "./pais-procedencia.service";


@Injectable()
export class paisProcedenciaResolver implements Resolve<personaNatural> {
  constructor(private paisProcedenciaService: paisProcedenciaService,
              private router: Router,
              ) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {

    return this.paisProcedenciaService.getAllPaises()
      .map((response) => response);
  }
}
