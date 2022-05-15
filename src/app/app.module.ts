import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component';
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';
import {TabMenuComponent} from './layout/tab-menu/tab-menu.component';
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {SpinnerService} from "./core/service/spinner.service";
import {CustomHttpInterceptor} from "./core/interceptor/custom-http.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    ContentLayoutComponent,
    TabMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    CoreModule,
    ToastModule,
    HttpClientModule
  ],
  providers: [MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    SpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
