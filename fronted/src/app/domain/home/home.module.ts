import {NgModule} from "@angular/core";

import {SharedModule} from "../../shared/shared.module";
import {HomeRoutingModule} from "./home-routing.module";

import {HomeComponent} from "./home/home.component";
import {NgxTreeSelectModule} from "ngx-tree-select";
import { CKEditorModule } from 'ng2-ckeditor';
import {CasoPruebaService} from "./home/services/caso-prueba.service";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {CasoPruebaResolver} from "./home/services/caso-prueba-resolver.service";

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
    CKEditorModule,
    NgxTreeSelectModule.forRoot({
      allowFilter: true,
      filterPlaceholder: 'Type your filter here...',
      maxVisibleItemCount: 5,
      idField: 'id',
      textField: 'name',
      childrenField: 'children',
      allowParentSelection: true
    }),
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
    CasoPruebaService,
    CasoPruebaResolver
  ]
})
export class HomeModule {
}
