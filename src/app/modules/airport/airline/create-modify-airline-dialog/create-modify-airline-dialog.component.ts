import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {markFormControlsAsTouched, setFormValues, unsubscribeAllSubscriptions} from "../../../../shared/func/functions";
import {CREATE} from "../../../../core/constants/actions";
import {MessageService} from "primeng/api";
import {Airline} from "../../../../data/models/airport/airline.model";
import {AirlineService} from "../../../../data/services/airport/airline.service";

@Component({
  selector: 'app-create-modify-airline-dialog',
  templateUrl: './create-modify-airline-dialog.component.html',
  styleUrls: ['./create-modify-airline-dialog.component.scss']
})
export class CreateModifyAirlineDialogComponent implements OnInit, OnDestroy {

  airlineForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(public _: MatDialogRef<CreateModifyAirlineDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private airlineService: AirlineService
  ) {
    this.airlineForm = this.buildAirlineForm();
  }


  ngOnInit(): void {
    this.validateIfAirlineExists();
  }

  private validateIfAirlineExists(): void {
    if (this.data.airline) {
      this.setAirlineFormValues(this.data.airline);
    }
  }

  private buildAirlineForm(): FormGroup {
    return this.airlineForm = this.formBuilder.group({
      id: [],
      name: [Validators.required]
    })
  }

  private setAirlineFormValues(airline: Airline) {
    setFormValues(this.airlineForm, airline);
  }

  public confirm(): void {
    let airline: Airline;
    if (this.airlineForm.invalid) {
      markFormControlsAsTouched(this.airlineForm);
      return;
    }
    airline = this.airlineForm.value;
    let subscription: Subscription;
    if (this.data.action === CREATE) {
      subscription = this.createAirline(airline);
    } else {
      subscription = this.updateAirline(airline);
    }
    this.subscriptions.push(subscription);
  }

  private createAirline(airline: Airline): Subscription {
    return this.airlineService.save(airline).subscribe(r => {
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

  private updateAirline(airline: Airline): Subscription {
    return this.airlineService.update(airline).subscribe(r => {
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
