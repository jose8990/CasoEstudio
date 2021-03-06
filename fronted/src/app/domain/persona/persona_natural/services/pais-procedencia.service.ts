import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import {ApiService} from "../../../../core/services";

@Injectable()
export class paisProcedenciaService {
  private urlPais: string = '/nomenclador/nomencladores';

  constructor(private apiService: ApiService) {
  }

  getAllPaises(): Observable<any> {
    return this.apiService.post(this.urlPais, "NPAIS");
  }


}
