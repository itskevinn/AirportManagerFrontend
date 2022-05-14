import { NgModule } from '@angular/core';
import { CitiesInfoComponent } from './cities-info/cities-info.component';
import { CreateModifyCityDialogComponent } from './create-modify-city-dialog/create-modify-city-dialog.component';
import {SharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [
    CitiesInfoComponent,
    CreateModifyCityDialogComponent
  ],
  imports: [
    SharedModule
  ]
})
export class CityModule { }
