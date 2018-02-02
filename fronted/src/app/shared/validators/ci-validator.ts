import {Directive, HostListener} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {AbstractControl, NG_VALIDATORS} from "@angular/forms";

@Directive({
  selector: '[ci_validator][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: CiValidatorDirective, multi: true}
  ]
})
export class CiValidatorDirective {

  constructor(private translate: TranslateService) {
  }


  expression = /^([0-9]+)$/i;

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    if (!this.expression.test(event.key)) event.preventDefault();
  }

  validate(control: AbstractControl): { [validator: string]: string } {
    if (!control.value) { // the [required] validator will check presence, not us
      return null;
    }

    const value = control.value;

    if (value.length !== 11) {
      return {ci_validator: this.translate.instant('Carné de identidad no válido, debe contener 11 dígitos.')};
    }

  }
}
