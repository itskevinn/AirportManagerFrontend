import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {markFormControlsAsTouched, unsubscribeAllSubscriptions} from "../../../../shared/func/functions";
import {CREATE} from "../../../../core/constants/actions";
import {MessageService} from "primeng/api";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {CityService} from "../../../../data/services/airport/city.service";
import {AirlineService} from "../../../../data/services/airport/airline.service";
import {City} from "../../../../data/models/airport/city.model";
import {Airline} from "../../../../data/models/airport/airline.model";
import {Flight} from "../../../../data/models/airport/flight.model";
import {FlightService} from "../../../../data/services/airport/flight.service";
import {AuthService} from "../../../../data/services/security/auth.service";

@Component({
  selector: 'app-create-modify-flight-dialog',
  templateUrl: './create-modify-flight-dialog.component.html',
  styleUrls: ['./create-modify-flight-dialog.component.scss']
})
export class CreateModifyFlightDialogComponent implements OnInit, OnDestroy {

  today: Date = new Date();
  flightForm: FormGroup;
  subscriptions: Subscription[] = [];
  cities: City[] = [];
  airlines: Airline[] = [];
  es: any;
  username: string = '';

  constructor(public _: MatDialogRef<CreateModifyFlightDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private cityService: CityService,
              private airlineService: AirlineService,
              private flightService: FlightService,
              private authService: AuthService,
  ) {
    this.flightForm = this.buildFlightForm();
    this.username = authService.currentUserValue.username;
  }


  ngOnInit(): void {
    this.validateIfFlightExists();
    this.getAirlines();
    this.getCities();
  }

  private getCities(): void {
    this.subscriptions.push(
      this.cityService.getAll().subscribe(r => {
        if (!r.success) {
          this.messageService.add({
            closable: true,
            key: 'gt',
            severity: 'error',
            summary: 'Error',
            'detail': r.message
          });
          return;
        }
        this.cities = r.data;
      })
    )
  }

  private getAirlines(): void {
    this.subscriptions.push(
      this.airlineService.getAll().subscribe(r => {
        if (!r.success) {
          this.messageService.add({severity: 'error', key: 'gt', closable: true, summary: 'Error', detail: r.message})
          return;
        }
        this.airlines = r.data;
      }));
  }

  private validateIfFlightExists(): void {
    if (this.data.flight) {
      this.setFlightFormValues(this.data.flight);
    }
  }

  private buildFlightForm(): FormGroup {
    return this.flightForm = this.formBuilder.group({
      id: [null],
      departureCityId: [null, Validators.required],
      destinyCityId: [null, Validators.required],
      checkOutDate: [null, Validators.required],
      checkInTime: [null, Validators.required],
      checkOutTime: [null, Validators.required],
      airlineId: [null, Validators.required]
    })
  }

  private setFlightFormValues(flight: Flight) {
    this.flightForm.controls['departureCityId']?.setValue(flight.departureCity?.id);
    this.flightForm.controls['destinyCityId']?.setValue(flight.destinyCity?.id);
    this.flightForm.controls['checkOutDate']?.setValue(new Date(flight.checkOutDate));
    this.flightForm.controls['checkInTime']?.setValue(new Date(flight.checkInTime));
    this.flightForm.controls['checkOutTime']?.setValue(new Date(flight.checkOutTime));
    this.flightForm.controls['airlineId']?.setValue(flight.airline.id);

  }

  public confirm(): void {
    let flight: Flight;
    if (this.flightForm.invalid) {
      markFormControlsAsTouched(this.flightForm);
      return;
    }
    flight = this.flightForm.value;
    if (this.flightForm.controls['departureCityId'].value ==
      this.flightForm.controls['destinyCityId'].value) {
      this.messageService.add({
        severity: 'warn',
        key: 'gt',
        closable: true,
        summary: 'Aviso',
        detail: 'La ciudad de salida y de entrada son las mismas'
      });
    }
    let subscription: Subscription;
    if (this.data.action === CREATE) {
      subscription = this.createFlight(flight);
    } else {
      subscription = this.updateFlight(flight);
    }
    this.subscriptions.push(subscription);
  }

  private createFlight(flight: Flight): Subscription {
    flight.createdBy = this.username;
    return this.flightService.save(flight).subscribe(r => {
      if (!r.success) {
        this.messageService.add({
          severity: 'error',
          key: 'gt',
          closable: true,
          summary: 'Ha ocurrido un error',
          detail: r.message
        })
        return;
      }
      this.messageService.add({severity: 'success', key: 'gt', closable: true, summary: 'Éxito', detail: r.message})
    })
  }

  private updateFlight(flight: Flight): Subscription {
    flight.updatedBy = this.username;
    return this.flightService.update(flight).subscribe(r => {
      if (!r.success) {
        this.messageService.add({
          severity: 'error',
          key: 'gt',
          closable: true,
          summary: 'Ha ocurrido un error',
          detail: r.message
        })
        return;
      }
      this.messageService.add({severity: 'success', key: 'gt', closable: true, summary: 'Éxito', detail: r.message})
    });
  }

  ngOnDestroy(): void {
    unsubscribeAllSubscriptions(this.subscriptions);
  }
}
