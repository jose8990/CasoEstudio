import {Component, Inject, Input, OnInit, Optional, ViewChild} from "@angular/core";
import {ElementBase} from "../../form/element-base";
import {NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.css']
})
export class TreeSelectComponent extends ElementBase<Array<any>> implements OnInit {

  @Input('allowParentSelection') public AllowParentSelection;

  @Input('showFilter') public ShowFilter;

  @Input('disabled') public Disabled;

  @Input('filterPlaceholder') public FilterPlaceholder;

  @Input('maxDisplayed') public MaxDisplayed;

  @Input() public items;

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
