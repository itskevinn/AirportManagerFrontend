import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Response} from "../../../shared/models/response.model";
import {Airline} from "../../models/airport/airline.model";
import {catchError, Observable} from "rxjs";
import {BaseService} from "../base/base-service";

@Injectable({
  providedIn: 'root'
})
export class AirlineService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  public getAll(): Observable<Response<Airline[]>> {
    return this.http.get<Response<Airline[]>>(`${this.baseUrl}/Airline/GetAll`)
      .pipe(catchError(err => {
        throw err;
      }))
  }


  public save(airline: Airline): Observable<Response<Airline>> {
    return this.http.post<Response<Airline>>(`${this.baseUrl}/Airline/Create`, airline).pipe(
      catchError(err => {
        throw err;
      })
    );
  }


  public update(airline: Airline): Observable<Response<Airline>> {
    return this.http.put<Response<Airline>>(`${this.baseUrl}/Airline/Update`, airline).pipe(
      catchError(err => {
        throw err;
      })
    );
  }

  public getById(id: string): Observable<Response<Airline>> {
    return this.http.get<Response<Airline>>(`${this.baseUrl}/Airline/GetById/${id}`)
      .pipe(catchError(err => {
        throw err
      }))
  }

}
