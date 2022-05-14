import {Injectable} from '@angular/core';
import {catchError, Observable} from "rxjs";
import {Response} from "../../../shared/models/response.model";
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../base/base-service";
import {City} from "../../models/airport/city.model";

@Injectable({
  providedIn: 'root'
})
export class CityService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  public getAll(): Observable<Response<City[]>> {
    return this.http.get<Response<City[]>>(`${this.baseUrl}/City/GetAll`)
      .pipe(catchError(err => {
        throw err;
      }))
  }


  public save(flight: City): Observable<Response<City>> {
    return this.http.post<Response<City>>(`${this.baseUrl}/City/Create`, flight).pipe(
      catchError(err => {
        throw err;
      })
    );
  }


  public update(flight: City): Observable<Response<City>> {
    return this.http.put<Response<City>>(`${this.baseUrl}/City/Update`, flight).pipe(
      catchError(err => {
        throw err;
      })
    );
  }

  public getById(id: string): Observable<Response<City>> {
    return this.http.get<Response<City>>(`${this.baseUrl}/City/GetById/${id}`)
      .pipe(catchError(err => {
        throw err
      }))
  }
}
