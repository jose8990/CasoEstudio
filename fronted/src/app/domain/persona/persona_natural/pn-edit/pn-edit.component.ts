import {Component, Input, OnInit} from "@angular/core";
import {personaNatural} from "../models/persona_natural.model";
import {estadoCivilService} from "../services/estado-civil.service";
import {PersonaNaturalService} from "../services/persona-natural.service";
import {MunicipioService} from "../services/municipio.service";
import {NotificationsService} from "../../../../core/services/notifications.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {ModalService} from "../../../../shared/services/modal.service";

@Component({
  selector: 'app-pn-edit',
  templateUrl: './pn-edit.component.html',
  styleUrls: ['./pn-edit.component.css']
})
export class PnEditComponent implements OnInit {
  @Input() generico: boolean = false;

  /*pnCubano: boolean;
   pnActivo: boolean;*/

  pnEdit: personaNatural;


  estadosciviles: any[];
  generos: any[];
  razas: any[];
  paises: any[];
  provincias: any[];
  municipios: any[];


  onSubmit() {
    //aqui la logica es alreves si cuando == false es porque es cubano, si no es extranjero !!!
    if (this.pnEdit.cubano === false) {
      this.pnEdit.idpaisorigen = null;
      this.pnEdit.idpaisresidencia = 47;
    }
    else {
      this.pnEdit.idprovincia = null;
      this.pnEdit.idmunicipio = null;
    }
    this.personaNaturalService.save(this.pnEdit)
      .subscribe(
        success => {
          if (!this.generico) {
            this.router.navigateByUrl('/personanatural');
          } else {
            const idpersonanatural = this.pnEdit.idpersonanatural;
            this.router.navigate(['/generico/personanatural/list', idpersonanatural]);
          }
        }, error => {
        });
  }


  // cubanoToString() {
  //   if (this.pnCubano === true) {
  //     this.pnEdit.cubano = 'true';
  //   }
  //   else this.pnEdit.cubano = 'false';
  // }
  //
  // activoToString() {
  //   if (this.pnActivo === true) {
  //     this.pnEdit.activo = 'true';
  //   }
  //   else this.pnEdit.activo = 'false';
  // }

  constructor(private estadoCivilService: estadoCivilService,
              private personaNaturalService: PersonaNaturalService,
              private municipioService: MunicipioService,
              private notificationsService: NotificationsService,
              private route: ActivatedRoute,
              private translate: TranslateService,
              public modalService: ModalService,
              private router: Router) {
  }


  cargarMunicipio($event): void {
    if ($event.target.value !== "") {

      this.municipioService.getAllMunicipios($event.target.value).subscribe((data: any) => {
        this.municipios = data;
      });
    }
  }

  activar_desactivar_Promovente(pActivo,$event): void {
    // $event.preventDefault();
    // $event.stopPropagation();
    // $event.preventDefaultEvent();
    // $event._stopPropagation();
    this.pnEdit.activo = pActivo;
    this.modalService.close('activar_desactivar');

  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: {personaNatural: personaNatural, estadoCivil: any[], genero: any[], raza: any[], paiss: any[], provincia: any[]}) => {
        this.estadosciviles = data.estadoCivil;
        this.generos = data.genero;
        this.razas = data.raza;
        this.paises = data.paiss;
        this.provincias = data.provincia;
        this.pnEdit = data.personaNatural;

        const tempIddpaprovincia = this.pnEdit.idprovincia;
        const tempIdmunicipio = this.pnEdit.idmunicipio;
        if (tempIddpaprovincia) {
          this.municipioService.getAllMunicipios(tempIddpaprovincia).subscribe((data2: any) => {
            this.municipios = data2;
            this.pnEdit.idmunicipio = tempIdmunicipio + '';
          });
        }

      }
    );
  }

}
