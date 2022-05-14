import {Component, OnDestroy, OnInit} from '@angular/core';
import {CREATE, UPDATE} from "../../../../core/constants/actions";
import {Subscription} from "rxjs";
import {MessageService} from "primeng/api";
import {Airline} from "../../../../data/models/airport/airline.model";
import {AirlineService} from "../../../../data/services/airport/airline.service";
import {
  CreateModifyAirlineDialogComponent
} from "../create-modify-airline-dialog/create-modify-airline-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {unsubscribeAllSubscriptions} from "../../../../shared/func/functions";

@Component({
  selector: 'app-airlines-info',
  templateUrl: './airlines-info.component.html',
  styleUrls: ['./airlines-info.component.scss']
})
export class AirlinesInfoComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  airlines: Airline[] = [];

  constructor(private airlineService: AirlineService,
              private messageService: MessageService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAirlines();
  }

  private getAirlines(): void {
    let subscription = this.airlineService.getAll().subscribe(r => {
      if (!r.success) {
        return;
      }
      this.airlines = r.body;
    });
    this.subscriptions.push(subscription);
  }

  public showRegisterModifyAirlineDialog(action: string, airline?: Airline): void {
    switch (action) {
      case CREATE: {
        this.openDialog(null!, CREATE);
      }
        break;
      case UPDATE: {
        this.openDialog(airline!, UPDATE);
      }
        break;
      default:
        break;
    }
  }

  private openDialog(airline: Airline, action: string): void {
    let dialogRef = this.dialog.open(CreateModifyAirlineDialogComponent, {
      width: '80%',
      data: {action: action, airline: airline},
    });
    let subscription = dialogRef.afterClosed().subscribe(_ => {
      this.getAirlines();
    })
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    unsubscribeAllSubscriptions(this.subscriptions);
  }

}
