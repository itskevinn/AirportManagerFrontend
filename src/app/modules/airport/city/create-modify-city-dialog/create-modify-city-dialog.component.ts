import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "primeng/api";
import {CityService} from "../../../../data/services/airport/city.service";
import {City} from "../../../../data/models/airport/city.model";
import {markFormControlsAsTouched, setFormValues, unsubscribeAllSubscriptions} from "../../../../shared/func/functions";
import {CREATE} from "../../../../core/constants/actions";

@Component({
  selector: 'app-create-modify-city-dialog',
  templateUrl: './create-modify-city-dialog.component.html',
  styleUrls: ['./create-modify-city-dialog.component.scss']
})
export class CreateModifyCityDialogComponent implements OnInit, OnDestroy {


  cityForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(public _: MatDialogRef<CreateModifyCityDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private cityService: CityService
  ) {
    this.cityForm = this.buildCityForm();
  }


  ngOnInit(): void {
    this.validateIfCityExists();
  }

  private validateIfCityExists(): void {
    if (this.data.city) {
      this.setCityFormValues(this.data.city);
    }
  }

  private buildCityForm(): FormGroup {
    return this.cityForm = this.formBuilder.group({
      id: [],
      name: [Validators.required]
    })
  }

  private setCityFormValues(city: City) {
    setFormValues(this.cityForm, city);
  }

  public confirm(): void {
    let city: City;
    if (this.cityForm.invalid) {
      markFormControlsAsTouched(this.cityForm);
      return;
    }
    city = this.cityForm.value;
    let subscription: Subscription;
    if (this.data.action === CREATE) {
      subscription = this.createCity(city);
    } else {
      subscription = this.updateCity(city);
    }
    this.subscriptions.push(subscription);
  }

  private createCity(city: City): Subscription {
    return this.cityService.save(city).subscribe(r => {
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

  private updateCity(city: City): Subscription {
    return this.cityService.update(city).subscribe(r => {
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
