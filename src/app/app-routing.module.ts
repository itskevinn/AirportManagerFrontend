import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentLayoutComponent} from "./layout/content-layout/content-layout.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/airport/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'flights',
        loadChildren: () => import('./modules/airport/flight/flight.module').then(m => m.FlightModule)
      },
      {
        path: 'airlines',
        loadChildren: () => import('./modules/airport/airline/airline.module').then(m => m.AirlineModule)
      },
      {
        path: 'cities',
        loadChildren: () => import('./modules/airport/city/city.module').then(m => m.CityModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./modules/security/user/user.module').then(m => m.UserModule)
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./modules/security/auth/auth.module').then(m => m.AuthModule)
  },
  {path: '**', redirectTo: '/auth/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
