import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {ApiService} from '../../../../core/services';
import {personaNatural} from '../models';
import {IDatasourceRequest} from '../../../../shared/components/table/table.interfaces';
// import { Respons } from '../../../../shared/models';

@Injectable()
export class PersonaNaturalService {
  private urlResourcePersonaNatural = '/personanatural';

  constructor(private apiService: ApiService) {
  }

  getResource(request: any): IDatasourceRequest {
    const datasourceRequest = {
      url: this.urlResourcePersonaNatural + '/list',
      request: request,
      resource: 'personaNaturalResourceList',
      identifierResource: 'idpersonanatural'
    };
    return datasourceRequest;
  }


  get(id: number): Observable<Response> {
    return this.apiService.get(this.urlResourcePersonaNatural + '/' + id);
  }

  save(persona_natural: any): Observable<Response> {
    // If we're updating an existing queja
    if (persona_natural.idpersonanatural) {
      return this.apiService.put(this.urlResourcePersonaNatural + '/' + persona_natural.idpersonanatural, persona_natural);

      // Otherwise, create a new queja
    } else {
      return this.apiService.post(this.urlResourcePersonaNatural, persona_natural);
    }
  }
  /*save(persona_natural: personaNatural): Observable<Response> {
    // If we're updating an existing queja
    if (persona_natural.idPN) {
      return this.apiService.put(this.urlResourcePersonaNatural + '/' + persona_natural.idPN, persona_natural);

      // Otherwise, create a new queja
    } else {
      return this.apiService.post(this.urlResourcePersonaNatural, persona_natural);
    }
  }*/

  delete(id: number): Observable<Response> {
    return this.apiService.delete(this.urlResourcePersonaNatural + '/' + id);
  }

  deleteList(list: any[]): Observable<Response> {
    return this.apiService.deleteList(this.urlResourcePersonaNatural + '/deleteList', list);
  }
}
