import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

import {
  ColumnState,
  ITableColumn,
  ITableOptions,
  ITablePaging,
  PagingState
} from "../components/table/table.interfaces";

import {Languages} from "../components/table/table.languages";

@Injectable()
export class TableService {
  public stateChangedSource: BehaviorSubject<any> = new BehaviorSubject(this);
  public stateChanged$: Observable<TableService> = this.stateChangedSource.asObservable();
  public showFilterRow: boolean = false;
  public orderMulti: boolean = true;
  public columns: ColumnState[] = [];
  public paging: PagingState = {
    currentPage: 1,
    itemsPerPage: 10,
    recordsTotal: 0,
    recordsFiltered: 0
  };
  public sortStack: ColumnState[] = [];
  public fullTextFilter: string = '';
  public language: any = Languages['es'];

  private sortCycle = ['asc', 'desc', null];

  constructor() {
  }

  setOptions(options: ITableOptions): void {
    this.orderMulti = !!options.orderMulti ? options.orderMulti : true;
    this.language = typeof options.language === 'string' ? Languages[options.language] : options.language;
  }

  setColumns(columns: Array<ITableColumn>): void {
    const _this = this;

    this.columns = columns.map(c => {
      if (!!c.filter) {
        _this.showFilterRow = true;
      }

      const /** @type {?} */ column = {
        filterValue: null,
        sortOrder: c.defaultSortOrder,
        def: c,
        hasSort: c.sort,
        hasFilter: !!c.filter
      };

      if (!!column.sortOrder) {
        _this.sortStack.push(column);
      }
      return column;
    });
  }

  setPaging(paging: ITablePaging): void {
    this.paging = {
      currentPage: 1,
      itemsPerPage: paging.itemsPerPage,
      recordsTotal: 0,
      recordsFiltered: 0
    };
  }

  toggleSort(colState: ColumnState, orderMulti: boolean): void {
    colState.sortOrder = this.getNextSortOrder(colState.sortOrder);
    if (orderMulti) {
      const /** @type {?} */ curIndex = this.sortStack.indexOf(colState);
      if (curIndex === -1) {
        this.sortStack.push(colState);
      } else if (!colState.sortOrder) {
        this.sortStack.splice(curIndex, 1);
      }
    } else {
      this.sortStack = colState.sortOrder ? [colState] : [];
      this.columns.forEach(function (column) {
        if (column !== colState) {
          column.sortOrder = null;
        }
      });
    }
    this.notify();
  }

  changePaging(page: number, itemsPerPage: number): void {
    this.paging.currentPage = page;
    this.paging.itemsPerPage = itemsPerPage;
    this.notify();
  }

  changeFilter(column: ColumnState): void {
    this.paging.currentPage = 1;
    this.notify();
  }

  notify() {
    this.stateChangedSource.next(this);
  }

  getNextSortOrder(currentSortOrder): any {
    const /** @type {?} */ nextIndex = (this.sortCycle.indexOf(currentSortOrder) + 1) % this.sortCycle.length;
    return this.sortCycle[nextIndex];
  }
}
