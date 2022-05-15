import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Observable, tap} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {SpinnerService} from '../service/spinner.service'
import {Router} from "@angular/router";
import {AuthService} from "../../data/services/security/auth.service";


@Injectable({
  providedIn: 'root'
})
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(
    private messageService: MessageService,
    private spinnerService: SpinnerService,
    private authService: AuthService,
    private router: Router
  ) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    this.spinnerService.requestStarted();
    return next.handle(request).pipe(
      finalize(() => {
        this.spinnerService.requestEnded();
      }),

      tap({
        next: () => null,
        error: (err: HttpErrorResponse) => {
          this.spinnerService.resetSpinner();
          if (err.status === 401) {
            this.messageService.add({
              key: 'gt',
              summary: 'Error',
              severity: 'error',
              detail: "Usuario y/o contraseña incorrectos"
            });
            this.router.navigateByUrl('/login');
          }
          if (err.status >= 400 && err.status < 404 || err.status >= 405 || err.statusText == 'INTERNAL_SERVER_ERROR') {
            if (err.error && err.error.message) {
              this.messageService.add({key: 'gt', summary: 'Error', severity: 'error', detail: err.error?.message});
            } else {
              this.messageService.add({
                key: 'gt',
                summary: 'Error',
                severity: 'error',
                detail: 'Hubo un problema al intentar realizar esta acción'
              });
            }
          } else if (err.status === 404) {
            this.messageService.add({
              key: 'gt',
              summary: 'Error',
              severity: 'error',
              detail: 'No se encontró el recurso'
            });
          } else if (err.status === 0 && err.statusText === "Unknown Error" && err.name === "HttpErrorResponse") {
            this.messageService.add({
              key: 'gt',
              summary: 'Error',
              severity: 'error',
              detail: 'Por favor, revise su conexión a internet'
            });
          }
          throw err;
        }
      })
    );
  }
}
