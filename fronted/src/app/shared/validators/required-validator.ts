import {Directive} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

import {AbstractControl, NG_VALIDATORS} from "@angular/forms";

@Directive({
  selector: '[required][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: RequiredValidatorDirective, multi: true}
  ]
})
export class RequiredValidatorDirective {
  constructor(private translate: TranslateService) {
  }

  validate(control: AbstractControl): { [validator: string]: string } {
    if (!control.value || control.value === '' || (control.value instanceof Array && control.value.length === 0)) {
      return {distinct: this.translate.instant('app.base.validaciones.required')};
    }

    return null;
  }
}
