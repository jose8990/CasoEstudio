import {Directive, HostListener} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {AbstractControl, NG_VALIDATORS} from "@angular/forms";

@Directive({
  selector: '[text_letras][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: LetterValidatorDirective, multi: true}
  ]
})
export class LetterValidatorDirective {

  constructor(private translate: TranslateService) {

  }


  // expression = /^([a-zA-Z]*)$/i;
  expression = /^([a-z A-Z áéíóú ÁÉÍÓÚ ñÑ üÜ ëË]+)$/i;
  // expression = /^([a-zA-Z]*)$/i;

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    if (!this.expression.test(event.key)) event.preventDefault();
  }

  validate(control: AbstractControl): { [validator: string]: string } {
    if (!control.value) { // the [required] validator will check presence, not us
      return null;
    }

  }
}

