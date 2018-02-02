import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";

import {personaNatural} from "../models";
import {ProvinciaService} from "./provincia.service";

@Injectable()
export class ProvinciaResolver implements Resolve<personaNatural> {
  constructor(private provinciaService: ProvinciaService,
              private router: Router,) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {

    return this.provinciaService.getAllProvincias()
    //.map((response: any) => response)
      .map((response) => response);

  }

}
