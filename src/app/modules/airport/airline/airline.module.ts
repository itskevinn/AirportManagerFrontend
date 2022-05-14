import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AirlineRoutingModule} from './airline-routing.module';
import {AirlinesInfoComponent} from "./airlines-info/airlines-info.component";
import {
  CreateModifyAirlineDialogComponent
} from "./create-modify-airline-dialog/create-modify-airline-dialog.component";
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
  declarations: [AirlinesInfoComponent, CreateModifyAirlineDialogComponent],
  imports: [
    AirlineRoutingModule,
    SharedModule
  ]
})
export class AirlineModule {
}
