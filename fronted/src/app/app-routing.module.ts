import {ModuleWithProviders, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {NgxPermissionsGuard} from "ngx-permissions";
// Import Containers
import {FullLayout, SimpleLayout, GenericoLayout} from "./core/containers";

import {AuthGuard, NoAuthGuard} from "./core/services";
import {AccessDeniedComponent, ErrorPageComponent, PageNotfoundComponent} from "./core/page";

const rootRouting: ModuleWithProviders = RouterModule.forRoot([
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayout,
    canActivate: [AuthGuard],
    data: {
      title: 'app.domain.home.breadcrumb.title',
    },
    children: [

      {
        path: 'inicio',
        canActivate: [NgxPermissionsGuard],
        loadChildren: './domain/home/home.module#HomeModule',
      },
      {
        path: 'personanatural',
        loadChildren: './domain/persona/persona_natural/pn.module#PersonaNaturalModule',
      },
      // aqui se definen las paginas de acceso denegado, error y 404.
      {
        path: 'page/access-denied',
        component: AccessDeniedComponent,
        data: {
          title: 'app.base.page.access-denied.breadcrumb.title'
        }
      },
      {
        path: 'page/error',
        component: ErrorPageComponent,
        data: {
          title: 'app.base.page.error-400.breadcrumb.title'
        }
      },
      {
        path: 'page/404',
        component: PageNotfoundComponent,
        data: {
          title: 'app.base.page.error-404.breadcrumb.title'
        }
      }
    ]
  },
  {
    path: 'generico',
    component: GenericoLayout,
    data: {
      title: 'app.domain.generico.breadcrumb.title'
    },
  },
  {
    path: 'system',
    component: SimpleLayout,
    data: {
      title: 'app.base.system.breadcrumb.title'
    }
  },
  {
    path: '**',
    redirectTo: '/page/404'
  }
], {useHash: true});

@NgModule({
  imports: [rootRouting],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
