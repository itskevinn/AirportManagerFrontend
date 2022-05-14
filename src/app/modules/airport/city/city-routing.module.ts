import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CitiesInfoComponent} from "./cities-info/cities-info.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    component: CitiesInfoComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
