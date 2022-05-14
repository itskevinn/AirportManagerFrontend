import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FlightRoutingModule} from './flight-routing.module';
import {FlightsInfoComponent} from "./flights-info/flights-info.component";
import {CreateModifyFlightDialogComponent} from "./create-modify-flight-dialog/create-modify-flight-dialog.component";


@NgModule({
  declarations: [FlightsInfoComponent, CreateModifyFlightDialogComponent],
  imports: [
    CommonModule,
    FlightRoutingModule
  ]
})
export class FlightModule {
}
