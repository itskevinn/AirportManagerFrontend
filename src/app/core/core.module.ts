import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinnerService} from "./service/spinner.service";
import {SharedModule} from "../shared/shared.module";
import {SpinnerComponent} from "./components/spinner/spinner.component";


@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule, SharedModule
  ],
  exports:[SpinnerComponent],
  providers: [SpinnerService]
})
export class CoreModule {
}
