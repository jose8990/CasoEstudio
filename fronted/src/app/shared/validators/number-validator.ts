import {Directive, HostListener} from "@angular/core";

@Directive({
  selector: '[number][ngModel]'
})
export class NumberValidatorDirective {
  expression = /^([0-9]+)$/i;

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    if (!this.expression.test(event.key)) event.preventDefault();
  }
}
