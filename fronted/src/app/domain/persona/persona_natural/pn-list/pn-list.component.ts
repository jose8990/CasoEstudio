import {Component, Input, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {ModalService} from "../../../../shared/services/modal.service";
import {NotificationsService} from "../../../../core/services/notifications.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonaNaturalService} from "../services/persona-natural.service";
import {IDatasourceRequest, IDatasourceRequestLocal} from "../../../../shared/components/table/table.interfaces";
import {personaNaturalBuscar} from "../models/persona_natural_buscar.model";
import {IDynamicComponentData} from "../../../../shared/components/dynamic-wrapper/dynamic-wrapper.component";
import {MunicipioService} from "../services/municipio.service";
import {WindowService} from "../../../../core/services/window.service";
import {personaNatural} from "../models/persona_natural.model";
import {UtilesService} from "../../../../shared/services/utiles.service";

@Component({
  selector: 'app-pn-list',
  templateUrl: './pn-list.component.html',
  styleUrls: ['./pn-list.component.css']
})
export class PnListComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.router.navigateByUrl('/inicio');
  }


}
