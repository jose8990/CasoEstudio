import {
  Component, ContentChild, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges,
  TemplateRef
} from "@angular/core";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {URLSearchParams} from "@angular/http";
import {Subject} from "rxjs/Subject";

import {ITableColumn, ITableDataSource, ITableOptions, ITablePaging} from "./table.interfaces";
import {TableService} from "../../services";
import {ApiService} from "../../../core/services/api.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [
    TableService
  ]
})
export class TableComponent implements OnChanges, OnDestroy, OnInit {
  private subscription;
  private fullTextFilterValueChanged;

  public processing: boolean;

  @Input() options: ITableOptions;
  @Input() rows: Array<any>;
  @Input() datasource: ITableDataSource;
  @Input() columns: Array<ITableColumn>;
  @Input() paging: ITablePaging;
  @Input() @Output() idsRowSelected = [];

  @Output('onSearch') search = new EventEmitter<any>();

  selectedAll = false;

  // From Server Response
  identifierResourceServer: string = 'id';
  rowsFromServer: Array<any> = [];

  number: number = 0;
  size: number = 1000;
  totalElements: number;
  totalPages: number;
  forceLoad: boolean = false;

  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  constructor(private sanitizer: DomSanitizer, private apiService: ApiService, public state: TableService) {
    const _this = this;
    this.fullTextFilterValueChanged = new Subject();
    this.processing = false;
    this.options = null;
    this.rows = [];
    this.datasource = null;
    this.columns = [];
    this.paging = null;
    this.idsRowSelected = [];
    this.selectedAll = false;
    this.fullTextFilterValueChanged
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(filterValue => _this.onChangeTable());
  }

  ngOnInit(): void {
    const _this = this;
    this.subscription = this.state.stateChanged$.subscribe(() => _this.onChangeTable());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && changes['options'].isFirstChange()) {
      this.state.setOptions(changes['options'].currentValue);
    }
    if (changes['paging'] && changes['paging'].isFirstChange()) {
      this.state.setPaging(changes['paging'].currentValue);
    }
    if (changes['columns'] && changes['columns'].isFirstChange()) {
      this.state.setColumns(changes['columns'].currentValue);
    }

    if (changes['idsRowSelected']) {
      this.forceLoad = true;
      this.number = 0;
      this.rowsFromServer = [];
      this.onChangeTable();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  onChangeLocalTable(): void {
    const _this = this;
    const fullTextFilter = this.state.fullTextFilter;
    const /** @type {?} */ orders_1 = new Array();
    this.state.sortStack.forEach(function (column) {
      const /** @type {?} */ order = {
        dir: column.sortOrder,
        name: column.def.name
      };
      orders_1.push(order);
    });

    const /** @type {?} */ filters_1 = new Array();
    let filtersValue = 0;
    this.state.columns.forEach(function (column) {
      if (column.hasFilter) {
        const /** @type {?} */ filter = {
          name: column.def.name,
          type: column.def.filter.type,
          value: column.filterValue
        };
        filters_1.push(filter);
        if (column.filterValue) {
          filtersValue++;
        }
      }
    });

    let tempData = this.rowsFromServer.filter(row => {
      let constains = true;
      for (let i = 0; i < filters_1.length; i++) {
        const filter = filters_1[i];
        if (filter.value) {
          const str = row[filter.name];
          const strLowerCase = str.toLowerCase();
          if (strLowerCase.indexOf(filter.value.toLowerCase()) === -1) {
            constains = false;
          }
        }
      }
      return constains;
    });

    if (fullTextFilter) {
      tempData = tempData.filter(item => Object.keys(item).some(k => {
        if (typeof item[k] === 'string') {
          return item[k].toLowerCase().includes(fullTextFilter.toLowerCase());
        }
      }));
    }

    for (let i = 0; i < orders_1.length; i++) {
      const order = orders_1[i];
      tempData.sort((n1, n2) => {
        if (n1 instanceof Object) {
          if (n1[order.name] > n2[order.name]) {
            return order.dir === 'asc' ? 1 : -1;
          }

          if (n1[order.name] < n2[order.name]) {
            return order.dir === 'asc' ? -1 : 1;
          }
        }
        return 0;
      });
    }

    const start = (this.state.paging.currentPage - 1) *
      this.state.paging.itemsPerPage;

    const end = parseInt(start + '', 10) + parseInt(this.state.paging.itemsPerPage + '', 10);
    this.rows = tempData.slice(start, end);

    if (filtersValue > 0 || fullTextFilter) {
      this.state.paging.recordsFiltered = tempData.length;
      this.state.paging.recordsTotal = this.totalElements;
    } else {
      this.state.paging.recordsFiltered = this.totalElements;
      this.state.paging.recordsTotal = this.totalElements;
    }

    let checkAll = true;

    for (let i = 0; i < this.rows.length; i++) {
      const idenx = this.idsRowSelected.indexOf(this.rows[i][this.identifierResourceServer]);
      if (idenx === -1) {
        this['checkRowId_' + this.rows[i][this.identifierResourceServer]] = false;
        checkAll = false;
      } else {
        this['checkRowId_' + this.rows[i][this.identifierResourceServer]] = true;
      }
    }

    this['selectedAll'] = checkAll;
  }

  onChangeTable(): void {
    const numItemOffset = (this.state.paging.currentPage - 1) *
      this.state.paging.itemsPerPage;

    if (numItemOffset < this.rowsFromServer.length && this.number > 0 && this.forceLoad === false) {
      this.onChangeLocalTable();
    } else {
      const __this = this;
      this.forceLoad = false;

      if (this.datasource && this.processing === false) {
        this.processing = true;

        const pageable: URLSearchParams = new URLSearchParams();
        pageable.set('page', JSON.stringify(this.number));
        pageable.set('size', JSON.stringify(this.size));

        const /** @type {?} */ request = {};
        const datasourceTemp: any = this.datasource(request);

        if (datasourceTemp.url) {
          __this.identifierResourceServer = datasourceTemp.identifierResource;

          this.apiService.postWitchParamURL(datasourceTemp.url, datasourceTemp.request, pageable).subscribe(result => {
            if (result._embedded && result._embedded[datasourceTemp.resource] && result.page.number === __this.number) {
              __this.rowsFromServer = __this.rowsFromServer.concat(result._embedded[datasourceTemp.resource]);
              __this.number = result.page.number + 1 || 0;
              __this.totalElements = result.page.totalElements || 0;
              __this.totalPages = result.page.totalPages || 0;
              this.search.emit({
                search: result._embedded[datasourceTemp.resource]
              });
              this.state.paging.currentPage = 1;
            } else {
              this.search.emit({
                search: []
              });
            }
          }, error => {
            __this.processing = false;
          }, () => {
            __this.processing = false;
            __this.onChangeLocalTable();
          });
        } else {
          __this.identifierResourceServer = datasourceTemp.identifierResource;
          __this.rowsFromServer = datasourceTemp.data || [];
          __this.number = 0;
          __this.totalElements = __this.rowsFromServer.length || 0;
          __this.totalPages = 0;
          __this.processing = false;
          __this.onChangeLocalTable();
        }
      }
    }
  }

  getHtml(row: any, column: ITableColumn): string {
    if (column.renderComponent) {
      return '';
    } else if (column.render) {
      const /** @type {?} */ data = this.getData(row, column.name);
      return column.render(data, row);
    }
    return this.getData(row, column.name);
  }

  getComponentData(row: any, column: ITableColumn): string {
    if (column.renderComponent) {
      const /** @type {?} */ data = this.getData(row, column.name);
      return column.renderComponent(data, row);
    }
    return '';
  }

  getComponentDataDescription(row: any): any {
    return this.options.renderDescription(row);
  }

  isRender(column: ITableColumn): boolean {
    if (column.render) {
      return true;
    }
    return false;
  }

  getData(row: any, propertyName: string): string {
    return propertyName.split('.').reduce((prev, curr) => {
      return prev[curr];
    }, row);
  }

  cellClick(row: any, column: ITableColumn): void {
    if (column.action) {
      const /** @type {?} */ data = this.getData(row, column.name);
      column.action(data, row);
    }
  }

  checkAllClick(): void {
    // Si esta en false es porque esta marcado (detalle del checkbox)
    if (this.selectedAll === false) {
      for (let i = 0; i < this.rows.length; i++) {
        const idenx = this.idsRowSelected.indexOf(this.rows[i][this.identifierResourceServer]);
        if (idenx === -1) {
          this.idsRowSelected.push(this.rows[i][this.identifierResourceServer]);
        }
        this['checkRowId_' + this.rows[i][this.identifierResourceServer]] = true;
      }
    } else {
      for (let i = 0; i < this.rows.length; i++) {
        const idenx = this.idsRowSelected.indexOf(this.rows[i][this.identifierResourceServer]);
        if (idenx !== -1) {
          this.idsRowSelected.splice(idenx, 1);
        }
        this['checkRowId_' + this.rows[i][this.identifierResourceServer]] = false;
      }
    }
  }

  checkClick(row: any): void {
    const idenx = this.idsRowSelected.indexOf(row[this.identifierResourceServer]);
    if (idenx !== -1) {
      this.idsRowSelected.splice(idenx, 1);
    } else {
      this.idsRowSelected.push(row[this.identifierResourceServer]);
    }

    // Si this.selectedAll = true es que esta marcado.
    if (this.ifCheckAll() === true) {
      this.selectedAll = true;
    } else {
      this.selectedAll = false;
    }
  }

  ifCheckAll(): boolean {
    let checkAll = true;
    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];
      const idenx = this.idsRowSelected.indexOf(row[this.identifierResourceServer]);
      if (idenx === -1) {
        checkAll = false;
      }
    }
    return checkAll;
  }

  showColumn(row: any, show: boolean): void {
    for (let i = 0; i < this.rows.length; i++) {
      if (row[this.identifierResourceServer] !== this.rows[i][this.identifierResourceServer]) {
        this['showColumnRow' + this.rows[i][this.identifierResourceServer]] = false;
      }
    }

    this['showColumnRow' + row[this.identifierResourceServer]] = show;
  }

  onFullTextFilterValueChange(event: any): void {
    this.fullTextFilterValueChanged.next(event);
  }
}
