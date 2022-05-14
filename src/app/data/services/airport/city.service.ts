import {Injectable} from '@angular/core';
import {catchError, Observable} from "rxjs";
import {Response} from "../../../shared/models/response.model";
import {Flight} from "../../models/airport/flight.model";
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../base/base-service";

@Injectable({
  providedIn: 'root'
})
export class CityService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  public getAll(): Observable<Response<Flight[]>> {
    return this.http.get<Response<Flight[]>>(`${this.baseUrl}/City/GetAll`)
      .pipe(catchError(err => {
        throw err;
      }))
  }


  public save(flight: Flight): Observable<Response<Flight>> {
    return this.http.post<Response<Flight>>(`${this.baseUrl}/City/Create`, flight).pipe(
      catchError(err => {
        throw err;
      })
    );
  }


  public update(flight: Flight): Observable<Response<Flight>> {
    return this.http.put<Response<Flight>>(`${this.baseUrl}/City/Update`, flight).pipe(
      catchError(err => {
        throw err;
      })
    );
  }

  public getById(id: string): Observable<Response<Flight>> {
    return this.http.get<Response<Flight>>(`${this.baseUrl}/City/GetById/${id}`)
      .pipe(catchError(err => {
        throw err
      }))
  }
}
