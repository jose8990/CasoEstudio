import { Component, OnInit } from '@angular/core';
import {personaNatural} from "../models/persona_natural.model";
import {personaNaturalBuscar} from "../models/persona_natural_buscar.model";
import {IDatasourceRequest, IDatasourceRequestLocal} from "../../../../shared/components/table/table.interfaces";
import {IDynamicComponentData} from "../../../../shared/components/dynamic-wrapper/dynamic-wrapper.component";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {ModalService} from "../../../../shared/services/modal.service";
import {PersonaNaturalService} from "../services/persona-natural.service";
import {MunicipioService} from "../services/municipio.service";
import {NotificationsService} from "../../../../core/services/notifications.service";

@Component({
  selector: 'app-persona-natural-buscar',
  templateUrl: './persona-natural-buscar.component.html',
  styleUrls: ['persona-natural-buscar.component.css']
})
export class PersonaNaturalBuscarComponent implements OnInit {

  constructor(private router: Router) {  }



  ngOnInit() {
    this.router.navigateByUrl('/inicio');
  }

}
