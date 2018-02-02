import {Component, Inject, Input, OnInit, Optional, ViewChild, ViewEncapsulation} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

import {NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel} from "@angular/forms";

import {ElementBase} from "../../form";

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TextComponent,
    multi: true
  }]
})
export class TextComponent extends ElementBase<string> implements OnInit {
  @Input() public label: string;
  @Input() public placeholder: string = '';
  @Input() public help: string;
  @Input() public disabled: boolean = false;

  @ViewChild(NgModel) model: NgModel;

  public identifier = `form-text-${identifier++}`;

  constructor(@Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
              @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
              translate: TranslateService) {
    super(validators, asyncValidators, translate);
  }

  ngOnInit() {
  }
}

let identifier = 0;
