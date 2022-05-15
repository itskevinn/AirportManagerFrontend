import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinnerService} from "./service/spinner.service";
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {MenuService} from "../data/services/config/menu.service";


@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
  ],
  exports:[SpinnerComponent],
  providers: [SpinnerService,MenuService]
})
export class CoreModule {
}
