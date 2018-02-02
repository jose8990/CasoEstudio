import {Directive, Input} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

import {AbstractControl, NG_VALIDATORS} from "@angular/forms";

@Directive({
  selector: '[distinct][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: DistinctValueValidatorDirective, multi: true}
  ]
})
export class DistinctValueValidatorDirective {
  @Input('distinct') distinctInput: any;

  constructor(private translate: TranslateService) {
  }

  validate(control: AbstractControl): { [validator: string]: string } {
    if (!control.value) { // the [required] validator will check presence, not us
      return null;
    }

    const value = control.value;
    if (this.distinctInput !== value) {
      return null;
    }
    return {distinct: this.translate.instant('app.base.validaciones.distinct')};
  }
}
