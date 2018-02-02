import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import {ApiService} from "../../../../core/services";

@Injectable()
export class estadoCivilService {
  private urlEstadoCivil: string = '/nomenclador/nomencladores';


  constructor(private apiService: ApiService) {
  }

  getAllEstadosCiviles(): Observable<any> {

    return this.apiService.post(this.urlEstadoCivil, "NESTADO_CIVIL");
  }


}
