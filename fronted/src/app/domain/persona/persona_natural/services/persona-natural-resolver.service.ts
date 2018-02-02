import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";

import {personaNatural} from "../models";
// import { Response } from '../../../../shared/models';
import {PersonaNaturalService} from "./persona-natural.service";
import {NotificationsService} from "../../../../core/services";

@Injectable()
export class PersonaNaturalResolver implements Resolve<personaNatural> {
  constructor(private PersonaNaturalService: PersonaNaturalService,
              private router: Router,
              private notificationsService: NotificationsService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {

    return this.PersonaNaturalService.get(route.params['idPN'])
    // .map((response: Response) => response.data)
      .catch(err => this.router.navigateByUrl('/personanatural'));
  }
}
