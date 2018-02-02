import {Component, Input} from "@angular/core";
import {Subject} from "rxjs/Subject";

import {TableService} from "../../services";
import {ColumnState} from "./table.interfaces";

@Component({
  selector: 'app-table-filter-default',
  template: `
    <input class="form-control" style="width: 100%"
           [attr.type]="column.def.filter.config && column.def.filter.config.type ? column.def.filter.config.type : 'text'"
           [attr.placeholder]="column.def.filter.config && column.def.filter.config.placeholder ? column.def.filter.config.placeholder : ''"
           [attr.max]="column.def.filter.config && column.def.filter.config.max ? column.def.filter.config.max : 524288"
           [attr.min]="column.def.filter.config && column.def.filter.config.min ? column.def.filter.config.min : 0"
           [attr.step]="column.def.filter.config && column.def.filter.config.step ? column.def.filter.config.step : 1"
           [(ngModel)]="column.filterValue"
           (ngModelChange)="onFilterValueChange($event)"/>
  `,
})
export class TableFilteringDefaultComponent {
  @Input() column: ColumnState;
  filterValueChanged: Subject<any>;

  constructor(public state: TableService) {
    this.filterValueChanged = new Subject();
    this.filterValueChanged
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(filterValue => this.state.changeFilter(this.column));
  }

  onFilterValueChange(event: any): void {
    this.filterValueChanged.next(event);
  }
}
