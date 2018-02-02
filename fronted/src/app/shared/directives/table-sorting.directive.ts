import {Directive, HostListener, Input} from "@angular/core";

import {TableService} from "../services/table.service";
import {ColumnState} from "../components/table/table.interfaces";

@Directive({selector: '[ngTableSorting]'})
export class TableSortingDirective {
  @Input('ngTableSorting') column: ColumnState;

  constructor(private state: TableService) {
  }

  @HostListener('click', ['$event']) onToggleSort(event: any): void {
    if (event) {
      event.preventDefault();
    }
    if (this.column.hasSort) {
      this.state.toggleSort(this.column, event.shiftKey && this.state.orderMulti);
    }
  }

  @HostListener('mousedown', ['$event']) onDisableMouseDown(event: any): void {
    if (event) {
      event.preventDefault();
    }
  }
}
