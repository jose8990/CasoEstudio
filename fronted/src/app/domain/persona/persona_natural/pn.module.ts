import {NgModule} from "@angular/core";

import {SharedModule} from "../../../shared/shared.module";
import {PersonaNaturalRoutingModule} from "./pn-routing.module";
import {PnEditComponent} from "./pn-edit/pn-edit.component";
import {PnAddComponent} from "./pn-add/pn-add.component";
import {PersonaNaturalComponent} from "./pn.component";
import {ProvinciaResolver} from "./services/provincia-resolver.service";
import {ProvinciaService} from "./services/provincia.service";
import {estadoCivilService} from "./services/estado-civil.service";
import {estadoCivilResolver} from "./services/estado-civil-resolver.service";
import {generoService} from "./services/genero.service";
import {generoResolver} from "./services/genero-resolver.service";
import {PnListComponent} from "./pn-list/pn-list.component";
import {PersonaNaturalService} from "./services/persona-natural.service";
import {PersonaNaturalResolver} from "./services/persona-natural-resolver.service";
import {paisProcedenciaResolver} from "./services/pais-procedencia-resolver.service";
import {paisProcedenciaService} from "./services/pais-procedencia.service";
import {MunicipioService} from "./services/municipio.service";
import {razaService} from "./services/raza.service";
import {razaResolver} from "./services/raza-resolver.service";
import { PersonaNaturalDetailComponent } from './persona-natural-detail/persona-natural-detail.component';
import { PersonaNaturalBuscarComponent } from './persona-natural-buscar/persona-natural-buscar.component';

@NgModule({
  imports: [
    SharedModule,
    PersonaNaturalRoutingModule
  ],
  exports: [
    PersonaNaturalComponent,
    PnListComponent
  ],
  declarations: [
    PersonaNaturalComponent,
    PnListComponent
  ]
})
export class PersonaNaturalModule {
}
