import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {CREATE, UPDATE} from "../../../../core/constants/actions";
import {
  CreateModifyCityDialogComponent
} from "../create-modify-city-dialog/create-modify-city-dialog.component";
import {getDialogWidth, unsubscribeAllSubscriptions} from "../../../../shared/func/functions";
import {City} from "../../../../data/models/airport/city.model";
import {CityService} from "../../../../data/services/airport/city.service";

@Component({
  selector: 'app-cities-info',
  templateUrl: './cities-info.component.html',
  styleUrls: ['./cities-info.component.scss']
})
export class CitiesInfoComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  cities: City[] = [];

  constructor(private cityService: CityService,
              private dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.getCities();
  }

  private getCities(): void {
    let subscription = this.cityService.getAll().subscribe(r => {
      if (!r.success) {
        return;
      }
      this.cities = r.data;
    });
    this.subscriptions.push(subscription);
  }

  public showRegisterModifyCityDialog(action: string, city?: City): void {
    switch (action) {
      case CREATE: {
        this.openDialog(null!, CREATE);
      }
        break;
      case UPDATE: {
        this.openDialog(city!, UPDATE);
      }
        break;
      default:
        break;
    }
  }

  private openDialog(city: City, action: string): void {
    let dialogRef = this.dialog.open(CreateModifyCityDialogComponent, {
      width: getDialogWidth(),
      data: {action: action, city: city},
    });
    let subscription = dialogRef.afterClosed().subscribe(_ => {
      this.getCities();
    })
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    unsubscribeAllSubscriptions(this.subscriptions);
  }
}
