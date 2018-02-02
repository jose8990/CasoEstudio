import {Component, Inject, Input, OnInit, Optional, ViewChild, ViewEncapsulation} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

import {
  ControlValueAccessor, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel,
  RequiredValidator
} from "@angular/forms";

import {animations, ElementBase} from "../../form";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SelectComponent,
    multi: true,
  }]
})
export class SelectComponent extends ElementBase<any> implements ControlValueAccessor, OnInit {
  @Input() public label: string;
  @Input() public help: string;
  @Input() public disabled: boolean = false;

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
