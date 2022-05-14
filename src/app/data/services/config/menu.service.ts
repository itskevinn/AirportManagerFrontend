import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Response} from "../../../shared/models/response.model";
import {BaseService} from "../base/base-service";
import {MenuItem} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class MenuService extends BaseService{
  constructor(private http: HttpClient) {
    super();
  }

  public getAll(): Observable<Response<MenuItem[]>> {
    return this.http.get<Response<MenuItem[]>>(`${this.baseUrl}/MenuItem/GetAll`)
      .pipe(catchError(err => {
        throw err;
      }))
  }
}
