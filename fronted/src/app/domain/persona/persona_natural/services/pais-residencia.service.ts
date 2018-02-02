import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import {ApiService} from "../../../../core/services";

@Injectable()
export class paisResidenciaService {
  private urlPaisResidencia: string = '/paisesresidencia';

  constructor(private apiService: ApiService) {
  }

  getAll(): Observable<any> {
    return this.apiService.get(this.urlPaisResidencia);
  }


}
