import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesInfoComponent } from './cities-info/cities-info.component';
import { CreateModifyCityDialogComponent } from './create-modify-city-dialog/create-modify-city-dialog.component';



@NgModule({
  declarations: [
    CitiesInfoComponent,
    CreateModifyCityDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CityModule { }
