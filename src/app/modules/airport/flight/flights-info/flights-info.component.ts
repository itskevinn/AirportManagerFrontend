import {Component, OnDestroy, OnInit} from '@angular/core';
import {Flight} from "../../../../data/models/airport/flight.model";
import {FlightService} from "../../../../data/services/airport/flight.service";
import {CREATE, UPDATE} from "../../../../core/constants/actions";
import {unsubscribeAllSubscriptions} from "../../../../shared/func/functions";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {CreateModifyFlightDialogComponent} from "../create-modify-flight-dialog/create-modify-flight-dialog.component";
import {User} from "../../../../data/models/security/user.model";
import {AuthService} from "../../../../data/services/security/auth.service";
import {FlightDetailDialogComponent} from "../flight-detail-dialog/flight-detail-dialog.component";

@Component({
  selector: 'app-flights-info',
  templateUrl: './flights-info.component.html',
  styleUrls: ['./flights-info.component.scss']
})
export class FlightsInfoComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  flights: Flight[] = [];
  user: User;

  constructor(private flightService: FlightService,
              private dialog: MatDialog,
              private authService: AuthService) {
    this.user = authService.currentUserValue;
  }


  ngOnInit(): void {
    this.getFlights();
  }

  public get canAddOrEdit(): boolean {
    return this.user.roles.find(r => r.roleName.toLowerCase() == 'admin') != null;
  }

  private getFlights(): void {
    let subscription = this.flightService.getAll().subscribe(r => {
      if (!r.success) {
        return;
      }
      this.flights = r.data;
    });
    this.subscriptions.push(subscription);
  }

  public showFlightDetailsDialog(flight: Flight): void {
    this.openDetailDialog(flight);
  }

  public showRegisterModifyFlightDialog(action: string, flight?: Flight): void {
    switch (action) {
      case CREATE: {
        this.openDialog(null!, CREATE);
      }
        break;
      case UPDATE: {
        this.openDialog(flight!, UPDATE);
      }
        break;
      default:
        break;
    }
  }

  private openDetailDialog(flight: Flight): void {
    this.dialog.open(FlightDetailDialogComponent, {
      width: '80%',
      data: {flight: flight},
    });
  }

  private openDialog(flight: Flight, action: string): void {
    let dialogRef = this.dialog.open(CreateModifyFlightDialogComponent, {
      width: '80%',
      data: {action: action, flight: flight},
    });
    let subscription = dialogRef.afterClosed().subscribe(_ => {
      this.getFlights();
    })
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    unsubscribeAllSubscriptions(this.subscriptions);
  }

}
