import {Directive} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

import {AbstractControl, NG_VALIDATORS} from "@angular/forms";

@Directive({
  selector: '[hexadecimal][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: HexadecimalValueValidatorDirective, multi: true}
  ]
})
export class HexadecimalValueValidatorDirective {
  constructor(private translate: TranslateService) {
  }

  validate(control: AbstractControl): { [validator: string]: string } {
    const expression = /^([0-9a-fA-F]+)$/i;
    if (!control.value) { // the [required] validator will check presence, not us
      return null;
    }

    const value = control.value.trim();
    if (expression.test(value)) {
      return null;
    }
    return {hexadecimal: this.translate.instant('app.base.validaciones.hexadecimal')};
  }
}
