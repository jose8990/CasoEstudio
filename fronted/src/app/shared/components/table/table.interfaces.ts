import {IDynamicComponentData} from "../dynamic-wrapper/dynamic-wrapper.component";

export declare type SORT_ORDER = 'asc' | 'desc';
export declare type FILTER_TYPE = 'default' | 'text' | 'range' | 'daterange' | 'equals' | 'collection';
export declare type FILTER_CONTROL_TYPE = 'default' | 'list';
export interface Description {
  title: string;
  name: string;
}
export interface ITableOptions {
  language?: string | any;
  orderMulti?: boolean;
  className?: string;
  checked: boolean;
  description: Array<string | Description>;
  renderDescription: ITableDescriptionRenderComponent;
}
export interface ITablePaging {
  itemsPerPageOptions: number[];
  itemsPerPage: number;
  maxSize: number;
}
export interface ITableDataSource {
  (request: any): IDatasourceRequest | IDatasourceRequestLocal;
}
export interface ITableColumn {
  name: string;
  title?: string;
  width?: number;
  sort?: boolean;
  defaultSortOrder?: SORT_ORDER;
  filter?: ITableColumnFilter;
  render?: ITableColumnRender;
  renderComponent?: ITableColumnRenderComponent;
  customTemplate?: boolean;
  action?: ITableColumnAction;
}
export interface ITableColumnFilter {
  type: FILTER_TYPE;
  controlType: FILTER_CONTROL_TYPE;
  config?: ITableColumnFilterDefault | ITableColumnFilterList;
}
export interface ITableColumnFilterDefault {
  placeholder?: string;
  type?: string;
  max?: number | Date;
  min?: number | Date;
  step?: number;

  nullText?: string;
  list?: any[];
}
export interface ITableColumnFilterList {
  placeholder?: string;
  type?: string;
  max?: number | Date;
  min?: number | Date;
  step?: number;

  nullText?: string;
  list: any[];
}
export interface ITableColumnRender {
  (value: any, row: Object): string;
}
export interface ITableColumnRenderComponent {
  (value: any, row: Object): string;
}
export interface ITableColumnAction {
  (value: any, row: Object): void;
}
export interface ITableDescriptionRenderComponent {
  (row: Object): IDynamicComponentData;
}
export interface IDatasourceOrder {
  name: string;
  dir: SORT_ORDER;
}
export interface IDatasourceRequest {
  url: string;
  request: any;
  resource: string;
  identifierResource: string;
}
export interface IDatasourceRequestLocal {
  data: any[];
  identifierResource: string;
}
export interface IDatasourceResult {
  recordsTotal: number;
  recordsFiltered: number;
  data: any[];
}
export interface PagingState {
  currentPage: number;
  itemsPerPage: number;
  recordsTotal: number;
  recordsFiltered: number;
}
export interface ColumnState {
  filterValue: any;
  sortOrder: SORT_ORDER;
  def: ITableColumn;
  hasSort: boolean;
  hasFilter: boolean;
}
