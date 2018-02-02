import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AlertModule, BsDropdownModule, ModalModule, PaginationModule, TabsModule} from "ngx-bootstrap";
import {NgxPermissionsModule} from "ngx-permissions";
import {NgSlimScrollModule} from "ngx-slimscroll";
import {NgxTreeSelectModule} from "ngx-tree-select";
import {SelectModule} from "ng-select";
import {FileUploadModule} from "ng2-file-upload";
import {CKEditorModule} from "ng2-ckeditor";
import {DynamicComponentModule, DynamicHTMLModule} from "ng-dynamic";

// Import components
import {
  DatepickerComponent,
  DynamicWrapperComponent,
  Fixed,
  ListErrorsComponent,
  ModalComponent,
  Select2Component,
  SelectComponent,
  TableComponent,
  TableFilteringDefaultComponent,
  TableFilteringListComponent,
  TextareaComponent,
  TextComponent,
  TreeSelectComponent,
  ValidationMessagesComponent,
  UploadComponent,
  PdfPlantillaEditorComponent
} from "./components";

const SHARED_COMPONENTS = [
  TreeSelectComponent,
  DatepickerComponent,
  SelectComponent,
  Select2Component,
  TextComponent,
  TextareaComponent,
  TableComponent,
  TableFilteringDefaultComponent,
  TableFilteringListComponent,
  ModalComponent,
  ValidationMessagesComponent,
  DynamicWrapperComponent,
  ListErrorsComponent,
  Fixed,
  UploadComponent,
  PdfPlantillaEditorComponent
];

// Import directives
import {Hide, KeysPipe, TableSortingDirective} from "./directives";

const SHARED_DIRECTIVES = [
  Hide,
  KeysPipe,
  TableSortingDirective
];

// Import services
import {AppDatepickerI18nService, ModalService, UtilesService, UploadService, PdfMakeService} from "./services";
// pdf make
import {PdfmakeService} from "./pdf";

const SHARED_SERVICES = [
  AppDatepickerI18nService,
  ModalService,
  UtilesService,
  PdfmakeService,
  UploadService,
  PdfMakeService
];

// Import validators
import {
  DistinctValueValidatorDirective,
  HexadecimalValueValidatorDirective,
  LimitValidatorDirective,
  NumberValidatorDirective,
  RequiredValidatorDirective,
  CiValidatorDirective
} from "./validators";
import {LetterValidatorDirective} from "./validators/text-letras";

const SHARED_VALIDATION = [
  HexadecimalValueValidatorDirective,
  DistinctValueValidatorDirective,
  LimitValidatorDirective,
  NumberValidatorDirective,
  RequiredValidatorDirective,
  CiValidatorDirective,
  LetterValidatorDirective
];

@NgModule({
  imports: [
    NgxTreeSelectModule.forRoot({
      allowFilter: true,
      filterPlaceholder: 'Type your filter here...',
      maxVisibleItemCount: 5,
      idField: 'id',
      textField: 'name',
      childrenField: 'children',
      allowParentSelection: true
    }),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NgbModule,
    TranslateModule,
    BsDropdownModule,
    TabsModule,
    ModalModule,
    AlertModule,
    PaginationModule,

    NgSlimScrollModule,
    SelectModule,
    FileUploadModule,
    CKEditorModule,
    DynamicHTMLModule.forRoot({
      components: []
    }),
    DynamicComponentModule.forRoot({
      imports: [SharedModule]
    }),
  ],
  declarations: [
    SHARED_COMPONENTS,
    SHARED_DIRECTIVES,
    SHARED_VALIDATION,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    TabsModule,
    AlertModule,
    NgxPermissionsModule,
    NgSlimScrollModule,
    SelectModule,
    FileUploadModule,
    CKEditorModule,
    DynamicHTMLModule,
    DynamicComponentModule,

    SHARED_COMPONENTS,
    SHARED_DIRECTIVES,
    SHARED_VALIDATION
  ],
  providers: [
    SHARED_SERVICES,
    SHARED_DIRECTIVES
  ]
})
export class SharedModule {
}
