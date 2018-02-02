import {Component, Inject, Input, OnInit, Optional, ViewChild, ViewEncapsulation} from "@angular/core";
import {ElementBase} from "../../form";
import {NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TextareaComponent,
    multi: true
  }]
})
export class TextareaComponent extends ElementBase<string> implements OnInit {
  @Input() public label: string;
  @Input() public placeholder: string = '';
  @Input() public help: string;
  @Input() public numRows: number = 9;
  @Input() public disabled: boolean = false;

  @ViewChild(NgModel) model: NgModel;

  public identifier = `form-textarea-${identifier++}`;

  constructor(@Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
              @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
              translate: TranslateService) {
    super(validators, asyncValidators, translate);
  }

  ngOnInit() {
  }
}

let identifier = 0;
