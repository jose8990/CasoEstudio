import {Component, Input, OnInit} from "@angular/core";

import {TableService} from "../../services";
import {ColumnState} from "./table.interfaces";

@Component({
  selector: 'app-table-filter-list',
  template: `
    <select class="form-control" style="width: 100%"
            [(ngModel)]="column.filterValue"
            (ngModelChange)="state.changeFilter(column)">

      <option value="" selected="selected">{{ column.def.filter.config.placeholder || column.def.filter.config.nullText
        }}
      </option>
      <option *ngFor="let item of column.def.filter.config.list" [value]="item.value">{{item.text}}</option>
    </select>
  `,
})
export class TableFilteringListComponent implements OnInit {
  @Input() column: ColumnState;

  constructor(public state: TableService) {
  }

  ngOnInit(): void {
    this.column.filterValue = "";
  }
}
