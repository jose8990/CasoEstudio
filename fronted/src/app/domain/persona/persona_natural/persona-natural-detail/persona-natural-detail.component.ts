import {Component, Input, OnInit} from '@angular/core';
import {personaNatural} from "../models/persona_natural.model";
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationsService} from "../../../../core/services/notifications.service";
import {PersonaNaturalService} from "../services/persona-natural.service";
import {MunicipioService} from "../services/municipio.service";

@Component({
  selector: 'app-persona-natural-detail',
  templateUrl: './persona-natural-detail.component.html',
  styleUrls: ['./persona-natural-detail.component.css']
})
export class PersonaNaturalDetailComponent implements OnInit {
  @Input() generico: boolean = false;

  pnDetalles: personaNatural;
  estado_civil: any[];
  generos: any[];
  paises: any[];
  provincias: any[];
  municipios: any[];

  constructor(private notificationsService: NotificationsService,
              private route: ActivatedRoute,
              private router: Router,
              private personaNaturalService: PersonaNaturalService, private municipioService: MunicipioService) {
  }

  cargarMunicipio($event): void {
    if ($event.target.value !== "") {
      this.municipioService.getAllMunicipios($event.target.value).subscribe((data: any) => {
        this.municipios = data;
      });
    }
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { personaNatural: personaNatural, estadoCivil: any[], genero: any[], provincia: any[], paiss: any[] }) => {
        this.pnDetalles = data.personaNatural;
        this.estado_civil = data.estadoCivil;
        this.provincias = data.provincia;
        this.generos = data.genero;
        this.paises = data.paiss;

        const tempIddpaprovincia = this.pnDetalles.idprovincia;
        const tempIdmunicipio = this.pnDetalles.idmunicipio;
        if (tempIddpaprovincia) {
          this.municipioService.getAllMunicipios(tempIddpaprovincia).subscribe((data2: any) => {
            this.municipios = data2;
            this.pnDetalles.idmunicipio = tempIdmunicipio + '';
          });
        }
      }
    );
  }

}
