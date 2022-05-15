import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {MessageService} from "primeng/api";
import {User} from "../../data/models/security/user.model";

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {
  constructor(private router: Router, private messageService: MessageService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    let currentUser = JSON.parse(sessionStorage.getItem("currentSession")!);
    if (currentUser !== null) {
      return true;
    } else {
      this.router.navigateByUrl('/login').then(r => {
        if (!r) {
          this.messageService.add({
            key: 'gt',
            summary: 'Error',
            severity: 'error',
            detail: "Ha ocurrido un error, intente de nuevo más tarde"
          });
        }
      });
      return false;
    }
  }
}
