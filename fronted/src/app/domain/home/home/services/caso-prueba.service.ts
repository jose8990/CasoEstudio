import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ApiService} from "../../../../core/services/api.service";
import {IDatasourceRequest} from "../../../../shared/components/table/table.interfaces";

@Injectable()
export class CasoPruebaService {
  private urlResource = '/personanatural';

  constructor(
    public apiService: ApiService
  ) { }

  search(request: any): IDatasourceRequest {
    return {
      url: this.urlResource + '/list',
      request: request,
      resource: 'personaNaturalResourceList',
      identifierResource: 'idpersonanatural'
    };
  }

  obtenerPersonas(): Observable<any> {
    return this.apiService.post(this.urlResource + '/todas');
  }

  save(persona_natural: any): Observable<Response> {
    // If we're updating an existing queja
    if (persona_natural.idpersonanatural) {
      return this.apiService.put(this.urlResource + '/' + persona_natural.idpersonanatural, persona_natural);

      // Otherwise, create a new queja
    } else {
      return this.apiService.post(this.urlResource, persona_natural);
    }
  }
}
