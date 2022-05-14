import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {markFormControlsAsTouched, setFormValues, unsubscribeAllSubscriptions} from "../../../../shared/func/functions";
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

@Component({
  selector: 'app-create-modify-flight-dialog',
  templateUrl: './create-modify-flight-dialog.component.html',
  styleUrls: ['./create-modify-flight-dialog.component.scss']
})
export class CreateModifyFlightDialogComponent implements OnInit, OnDestroy {

  flightForm: FormGroup;
  subscriptions: Subscription[] = [];
  cities: City[] = [];
  airlines: Airline[] = [];
  es: any;

  constructor(public _: MatDialogRef<CreateModifyFlightDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private cityService: CityService,
              private airlineService: AirlineService,
              private flightService: FlightService
  ) {
    this.flightForm = this.buildFlightForm();
  }


  ngOnInit(): void {
    this.validateIfFlightExists();
    this.getAirlines();
    this.getCities();
    this.createEsCalendar();
  }

  private createEsCalendar(): void {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }
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
        this.cities = r.body;
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
        this.airlines = r.body;
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

    })
  }

  private setFlightFormValues(flight: Flight) {
    setFormValues(this.flightForm, flight);
  }

  public confirm(): void {
    let flight: Flight;
    if (this.flightForm.invalid) {
      markFormControlsAsTouched(this.flightForm);
      return;
    }
    flight = this.flightForm.value;
    let subscription: Subscription;
    if (this.data.action === CREATE) {
      subscription = this.createFlight(flight);
    } else {
      subscription = this.updateFlight(flight);
    }
    this.subscriptions.push(subscription);
  }

  private createFlight(flight: Flight): Subscription {
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
