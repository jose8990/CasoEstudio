import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";

import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import { LineChartDemoComponent } from './line-chart-demo/line-chart-demo.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    BrowserModule,

    SharedModule,
    CoreModule,

    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LineChartDemoComponent,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
