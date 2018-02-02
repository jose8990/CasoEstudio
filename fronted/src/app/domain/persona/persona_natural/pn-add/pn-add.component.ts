import {Component, Input, OnInit} from "@angular/core";
import {personaNatural} from "../models/persona_natural.model";
// import {PersonajService} from "../../persona_juridica/services/personaj.service";
import {NotificationsService} from "../../../../core/services/notifications.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {ModalService} from "../../../../shared/services/modal.service";
import {estadoCivilService} from "../services/estado-civil.service";
import {PersonaNaturalService} from "../services/persona-natural.service";
import {MunicipioService} from "../services/municipio.service";
import {falseIfMissing} from "protractor/built/util";


@Component({
  selector: 'app-pn-add',
  templateUrl: './pn-add.component.html',
  styleUrls: ['./pn-add.component.css']
})
export class PnAddComponent implements OnInit {


  constructor(public modalService: ModalService,
              private router: Router) {
  }

  ngOnInit() {
    this.router.navigateByUrl('/inicio');
  }


}
