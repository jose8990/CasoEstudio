import {Injectable} from "@angular/core";
import {ApiService} from "../../core/services/api.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UtilesService {
  private urlAdministracion = '/administracion';
  private currentDate: Date;

  constructor(private apiService: ApiService) {
  }

  public obtenerFechaActualServer(): Observable<Date> {
    if (this.currentDate) {
      return Observable.of(this.currentDate);
    } else {
      return this.apiService.get(this.urlAdministracion + '/' + 'fechaactual')
        .map(data => {
          this.currentDate = new Date(data.year, data.monthValue - 1, data.dayOfMonth);
          return this.currentDate;
        });
    }
  }

  public ESCRITO_ESTADO_CREADO: string = 'Creado';
  public ESCRITO_ESTADO_ACTUALIZADO: string = 'Actualizado';
  public ESCRITO_ESTADO_CERRADO: string = 'Cerrado';
  public ESCRITO_ESTADO_CLASIFICADO: string = 'Clasificado';

  public ESCRITO_RESPUESTA_ARCHIVAR: string = 'Archivar sin trámite (AST)';
  public ESCRITO_RESPUESTA_ORIENTACION: string = 'Orientación';
  public ESCRITO_RESPUESTA_CARTA: string = 'Carta al interesado';
  public ESCRITO_RESPUESTA_TRASLADADO: string = 'Trasladado';
  public ESCRITO_RESPUESTA_TRAMITADO: string = 'Tramitado';

  public PROMOVENTE_CUBANO: string = 'Cuba';

  public EXPEDIENTE_ESTADO_CERRADO: string = 'Cerrado';
  public EXPEDIENTE_ESTADO_CREADO: string = 'Creado';

}
