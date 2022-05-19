import {NgModule} from '@angular/core';

import {FlightRoutingModule} from './flight-routing.module';
import {FlightsInfoComponent} from "./flights-info/flights-info.component";
import {CreateModifyFlightDialogComponent} from "./create-modify-flight-dialog/create-modify-flight-dialog.component";
import {SharedModule} from "../../../shared/shared.module";
import {FlightDetailDialogComponent} from './flight-detail-dialog/flight-detail-dialog.component';
import {DatePipe} from "@angular/common";


@NgModule({
  declarations: [FlightsInfoComponent, CreateModifyFlightDialogComponent, FlightDetailDialogComponent],
  imports: [
    SharedModule,
    FlightRoutingModule,
  ]
})
export class FlightModule {
}
