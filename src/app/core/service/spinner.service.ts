import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {START, STOP} from "../constants/http-spinner-actions";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private count = 0;
  private spinner$ = new BehaviorSubject<number>(0);

  constructor() {
  }

  getSpinnerObserver(): Observable<number> {
    return this.spinner$.asObservable();
  }

  requestStarted() {
    if (++this.count === 1) {
      this.spinner$.next(START);
    }
  }

  requestEnded() {
    if (this.count === 0 || --this.count === 0) {
      this.spinner$.next(STOP);
    }
  }

  resetSpinner() {
    this.count = 0;
    this.spinner$.next(STOP);
  }
}
