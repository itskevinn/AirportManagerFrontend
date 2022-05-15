import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../base/base-service";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Response} from "../../../shared/models/response.model";
import {User} from "../../models/security/user.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    super();
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentSession')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public login(username: string, password: string): Observable<Response<any>> {
    return this.http.post<any>(`${this.baseUrl}/User/Authenticate`, {username, password})
      .pipe(map(user => {
        this.router.navigate(["/home"]);
        sessionStorage.setItem('currentSession', JSON.stringify(user.data));
        this.currentUserSubject.next(user.data);
        return user;
      }));
  }

  public logout(): void {
    sessionStorage.removeItem('currentSession');
    this.router.navigate([""]);
    this.currentUserSubject.next(null!);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


}
