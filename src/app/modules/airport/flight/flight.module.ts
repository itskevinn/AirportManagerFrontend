import {NgModule} from '@angular/core';

import {FlightRoutingModule} from './flight-routing.module';
import {FlightsInfoComponent} from "./flights-info/flights-info.component";
import {CreateModifyFlightDialogComponent} from "./create-modify-flight-dialog/create-modify-flight-dialog.component";
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
  declarations: [FlightsInfoComponent, CreateModifyFlightDialogComponent],
  imports: [
    SharedModule,
    FlightRoutingModule,
  ]
})
export class FlightModule {
}
