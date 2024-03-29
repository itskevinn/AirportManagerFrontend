import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FlightsInfoComponent} from "./flights-info/flights-info.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    component: FlightsInfoComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }
