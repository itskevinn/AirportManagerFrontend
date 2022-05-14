import {Injectable} from '@angular/core';
import {BaseService} from "../base/base-service";
import {catchError, Observable} from "rxjs";
import {Response} from "../../../shared/models/response.model";
import {HttpClient} from "@angular/common/http";
import {Flight} from "../../models/airport/flight.model";

@Injectable({
  providedIn: 'root'
})
export class FlightService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  public getAll(): Observable<Response<Flight[]>> {
    return this.http.get<Response<Flight[]>>(`${this.baseUrl}/Flight/GetAll`)
      .pipe(catchError(err => {
        throw err;
      }))
  }


  public save(flight: Flight): Observable<Response<Flight>> {
    return this.http.post<Response<Flight>>(`${this.baseUrl}/Flight/Create`, flight).pipe(
      catchError(err => {
        throw err;
      })
    );
  }


  public update(flight: Flight): Observable<Response<Flight>> {
    return this.http.put<Response<Flight>>(`${this.baseUrl}/Flight/Update`, flight).pipe(
      catchError(err => {
        throw err;
      })
    );
  }

  public getById(id: string): Observable<Response<Flight>> {
    return this.http.get<Response<Flight>>(`${this.baseUrl}/Flight/GetById/${id}`)
      .pipe(catchError(err => {
        throw err
      }))
  }
}
