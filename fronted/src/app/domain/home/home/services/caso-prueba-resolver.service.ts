import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Rx';

import {CasoPruebaService} from "./caso-prueba.service";
import {Persona} from "../model/persona.model";

@Injectable()
export class CasoPruebaResolver implements Resolve<Persona> {

  constructor(private escritoService: CasoPruebaService,
              private router: Router) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {


    return this.escritoService.obtenerPersonas()
      .map((response) => response)
      .catch(err => this.router.navigateByUrl('/inicio'));
  }
}
