import {APP_INITIALIZER, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Http, HttpModule} from "@angular/http";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {ChartsModule} from "ng2-charts/ng2-charts";
import {TabsModule} from "ngx-bootstrap/tabs";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ModalModule} from "ngx-bootstrap/modal";
import {AlertModule} from "ngx-bootstrap";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {NgxPermissionsModule} from "ngx-permissions";
import {BlockUIModule} from "ng-block-ui";
// Import containers
import {BackButtonComponent, FullLayout, GenericoLayout, Notifications, SimpleLayout} from "./containers";
// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ShowAuthedDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from "./directives";
// Import layout
import {AppAside, AppBreadcrumbs, AppFooter, AppHeader, AppNavbar, AppSidebar} from "./layout";
// Import page
import {AccessDeniedComponent, ErrorPageComponent, PageNotfoundComponent} from "./page";
// Import services
import {ApiService, AuthGuard, AuthService, NoAuthGuard, NotificationsService, WindowService} from "./services";

const ANGULAR_BASE = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpModule,
  HttpClientModule,
  RouterModule
];

const CORE_MODULE_IMPORT = [
  SharedModule,
  NgbModule.forRoot(),

  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  }),
  BsDropdownModule.forRoot(),
  TabsModule.forRoot(),
  ModalModule.forRoot(),
  ChartsModule,
  AlertModule.forRoot(),
  PaginationModule.forRoot(),
  NgxPermissionsModule.forRoot(),

  BlockUIModule
];

const CORE_MODULE_EXPORT = [
  NgbModule,
  TranslateModule,
  BsDropdownModule,
  TabsModule,
  ModalModule,
  ChartsModule,
  AlertModule,
  PaginationModule
];


const CORE_CONTAINERS = [
  FullLayout,
  SimpleLayout,
  GenericoLayout,
  Notifications,
  BackButtonComponent
];


const CORE_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  SIDEBAR_TOGGLE_DIRECTIVES,
  ShowAuthedDirective,
];


const CORE_LAYOUT = [
  AppAside,
  AppBreadcrumbs,
  AppFooter,
  AppHeader,
  AppNavbar,
  AppSidebar,
];


const CORE_PAGE = [
  AccessDeniedComponent,
  ErrorPageComponent,
  PageNotfoundComponent
];


const CORE_SERVICES = [
  ApiService,
  AuthGuard,
  NoAuthGuard,
  AuthService,
  NotificationsService,
  WindowService
];

export function core_load(authService: AuthService) {
  return () => {
    return authService.loadUserIfIsAutenticate();
  };
}

@NgModule({
  imports: [
    ANGULAR_BASE,
    CORE_MODULE_IMPORT
  ],
  exports: [
    CORE_MODULE_EXPORT,

    CORE_DIRECTIVES,
    CORE_CONTAINERS,
    CORE_LAYOUT
  ],
  declarations: [
    CORE_DIRECTIVES,
    CORE_CONTAINERS,
    CORE_LAYOUT,
    CORE_PAGE
  ],
  providers: [
    CORE_SERVICES,
    {
      provide: APP_INITIALIZER,
      useFactory: core_load,
      deps: [AuthService, Http],
      multi: true
    }
  ],
})
export class CoreModule {
  constructor(private translate: TranslateService,) {
    translate.setDefaultLang('es');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  getLanguage(): string {
    return this.translate.getDefaultLang();
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
