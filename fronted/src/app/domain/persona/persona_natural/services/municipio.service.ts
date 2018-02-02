import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import {ApiService} from "../../../../core/services";

@Injectable()
export class MunicipioService {
  private urlResourceMunicipios: string = '/nomenclador/municipios/';

  constructor(private apiService: ApiService) {
  }

  getAllMunicipios(id): Observable<any> {
    return this.apiService.get(this.urlResourceMunicipios + id);
  }

}
