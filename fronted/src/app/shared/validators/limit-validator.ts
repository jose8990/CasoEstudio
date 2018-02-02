import {Directive, Input} from "@angular/core";

@Directive({
  selector: '[limit][ngModel]',
  host: {
    '(keypress)': '_onKeypress($event)',
  }
})
export class LimitValidatorDirective {
  @Input('limit') limit

  _onKeypress(e) {
    const limit = +this.limit;
    if (e.target.value.length === limit) e.preventDefault();
  }
}
