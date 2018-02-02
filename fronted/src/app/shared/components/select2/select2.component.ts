import {Component, Inject, Input, OnInit, Optional, ViewChild, ViewEncapsulation} from "@angular/core";
import {IOption} from "ng-select";

import {animations, ElementBase} from "../../form";
import {
  ControlValueAccessor, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel,
  RequiredValidator
} from "@angular/forms";

import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-select2',
  templateUrl: './select2.component.html',
  styleUrls: ['./select2.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: Select2Component,
    multi: true,
  }]
})
export class Select2Component extends ElementBase<any> implements ControlValueAccessor, OnInit {
  @Input() public label: string;
  @Input() public help: string;
  @Input() public disabled: boolean = false;

  @Input() items: Array<IOption> = [];
  @Input() multiple: boolean = false;

  @ViewChild(NgModel) model: NgModel;

  public identifier = `form-select-${identifier++}`;
  public isRequiredValidator: boolean = false;

  constructor(@Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
              @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
              translate: TranslateService) {
    super(validators, asyncValidators, translate);
    if (validators) {
      validators.map(validator => {
        if (validator instanceof RequiredValidator) {
          this.isRequiredValidator = true;
        }
      });
    }
  }

  ngOnInit() {
  }

  writeValue(value: any) {
    if (value === null) {
      this.value = '';
    } else {
      this.value = value;
    }
  }
}

let identifier = 0;
