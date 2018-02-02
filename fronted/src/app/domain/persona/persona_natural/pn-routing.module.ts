import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {PersonaNaturalComponent} from "./pn.component";
import {PnAddComponent} from "./pn-add/pn-add.component";
import {PnEditComponent} from "./pn-edit/pn-edit.component";
import {ProvinciaResolver} from "./services/provincia-resolver.service";
import {estadoCivilResolver} from "./services/estado-civil-resolver.service";
import {generoResolver} from "./services/genero-resolver.service";
import {PnListComponent} from "./pn-list/pn-list.component";
import {paisProcedenciaResolver} from "./services/pais-procedencia-resolver.service";
import {razaResolver} from "./services/raza-resolver.service";
import {PersonaNaturalResolver} from "./services/persona-natural-resolver.service";
import {PersonaNaturalDetailComponent} from "./persona-natural-detail/persona-natural-detail.component";
import {PersonaNaturalBuscarComponent} from "./persona-natural-buscar/persona-natural-buscar.component";
import {paisResidenciaResolver} from "./services/pais-residencia-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: PersonaNaturalComponent,
    data: {
      title: 'Promovente'
    },
    children: [
      {
        path: '',
        component: PnListComponent,
        data: {
          title: 'Gestionar promovente'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonaNaturalRoutingModule {
}
