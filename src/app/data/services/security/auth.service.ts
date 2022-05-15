import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../base/base-service";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Response} from "../../../shared/models/response.model";
import {User} from "../../models/security/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    super();
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentSession')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public login(username: string, password: string): Observable<Response<any>> {
    return this.http.post<any>(`${this.baseUrl}api/login`, {username, password})
      .pipe(map(user => {
        localStorage.setItem('currentSession', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  public logout(): void {
    localStorage.removeItem('currentSession');
    this.currentUserSubject.next(null!);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


}
