import {FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

/**
 * Esta función coloca los valores
 * de una entidad dada a un formulario dado
 *
 * @param form - Formulario a colocar valores
 * @param data - Entidad a colocar en el form
 * */
export function setFormValues<T>(form: FormGroup, data: any): void {
  Object.keys(data).forEach(name => {
    if (form.controls[name]) {
      form.controls[name].patchValue(data[name], {onlySelf: true});
    }
  });
}

/**
 * Esta función marca los campos de un formulario
 * como tocados para poder ver donde se encuentran
 * los errores colocados con los Validators del FormGroup
 *
 * @param form - Formulario a tocar campos
 * */
export function markFormControlsAsTouched(form: FormGroup): void {
  const controls = form.controls;
  Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
}

/**
 * Esta función desuscribe las suscripciones enviadas
 * por parámetro
 *
 * @param subscriptions - Suscripciones a desuscribir
 * */
export function unsubscribeAllSubscriptions(subscriptions: Subscription[]) {
  subscriptions.forEach(s => {
    s.unsubscribe();
  });
}

/**
 * Devuelve el ancho para el material dialog para desktop o smartphone
 * @param anchoDesktop - Ancho deseado para el material dialog cuando se está en desktop, por defecto 45%
 * @returns string EJ: '45%'
 * */
const MAX_WIDTH_PHONE = 600;

export function getDialogWidth(desktopWidth = '45%'): string {
  return screen.width < MAX_WIDTH_PHONE ? '100vw' : desktopWidth;
}
