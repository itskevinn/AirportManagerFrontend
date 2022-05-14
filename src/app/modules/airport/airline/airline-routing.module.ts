import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AirlinesInfoComponent} from "./airlines-info/airlines-info.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    component: AirlinesInfoComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirlineRoutingModule { }
