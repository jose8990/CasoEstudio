import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ISlimScrollOptions} from 'ngx-slimscroll';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDate,
  getDay,
  getMonth,
  getYear,
  isSameDay,
  isSameMonth,
  isSameYear,
  setDay,
  setMonth,
  setYear,
  startOfMonth,
  subDays,
  subMonths
} from 'date-fns/esm';
import {ar, enUS, es, fr} from 'date-fns/esm/locale';

import {NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';

import {ElementBase} from '../../form';
import {UtilesService} from '../../services/utiles.service';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.sass'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DatepickerComponent,
      multi: true
    }
  ]
})
export class DatepickerComponent extends ElementBase<Date> implements OnInit, OnChanges {
  @Input() public label: string;
  @Input() public placeholder = '';
  @Input() public help: string;
  @Input() public displayFormat: string;
  @Input() public disabled = false;

  @Input() public today: boolean;
  @Input() public clear: boolean;
  @Input() public range?: { minDate: Date, maxDate: Date };
  @Input() public firstCalendarDay: number;
  @Input() public barTitleFormat: string;
  @Input() public minYear: number;
  @Input() public maxYear: number;

  currentDate: Date;
  initYear = 1969;
  moreYear = 100;

  isOpened: boolean;
  displayValue: string;
  date: Date;
  barTitle: string;
  view: string;
  years: { year: number; isThisYear: boolean }[];
  dayNames: string[];
  monthsNames: string[];
  scrollOptions: ISlimScrollOptions;
  days: {
    date: Date;
    day: number;
    month: number;
    year: number;
    inThisMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isActive: boolean;
  }[];
  locale: string;
  start: Date;
  end: Date;
  todayEnable: boolean;

  @ViewChild(NgModel) model: NgModel;

  public identifier = `form-datepicker-${identifier++}`;

  constructor(@Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
              @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
              translate: TranslateService,
              public elementRef: ElementRef,
              public utilService: UtilesService) {
    super(validators, asyncValidators, translate);
    this.scrollOptions = {
      barBackground: '#1a91eb',
      gridBackground: '#FFFFFF',
      barBorderRadius: '3',
      gridBorderRadius: '3',
      barWidth: '6',
      gridWidth: '6',
      barMargin: '0',
      gridMargin: '0'
    };
    this.locale = translate.getDefaultLang();
  }

  ngOnInit() {
    this.utilService.obtenerFechaActualServer().toPromise().then((data: Date) => {
      this.currentDate = data;
      this.view = 'days';
      this.setOptions();
      this.initDayNames();
      if (this.range != null) {
        this.range.maxDate = (this.range.maxDate) ? this.range.maxDate :  new Date(this.currentDate.getFullYear() + this.moreYear,
        this.currentDate.getMonth(), this.currentDate.getDate());
        this.range.minDate = (this.range.minDate) ? this.range.minDate :  new Date(this.initYear, 0, 1);
        this.date = this.range.minDate;

        this.rangeDate(this.range.maxDate, this.range.minDate);
        this.todayEnable = (this.currentDate >= this.range.minDate && this.currentDate <= this.range.maxDate );

      } else {
        this.date = this.currentDate;
        this.initYears();
        this.todayEnable = true;
      }
      this.initMonthNames();
      this.initDatepicker();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('options' in changes) {
      this.setOptions();
      this.initDayNames();
      this.initYears();
    }
  }

  rangeDate(endP: Date, startP: Date) {
    const a = startP || new Date(this.initYear, 0, 1);
    const b = endP || new Date(this.currentDate.getFullYear() + this.moreYear, 11, 31);
    const startYear = a.getFullYear();
    const endYear = b.getFullYear();
    this.maxYear = endYear;
    this.minYear = startYear;
    this.initYears();
  }

  capitalize(string: String) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  selectToday() {
    this.value = this.currentDate;
    this.initDatepicker();
    this.close();
  }

  clearDate() {
    this.value = null;
    this.ngOnInit();
    this.initDatepicker();
    this.displayValue = '';

  }

  setOptions(): void {
    this.minYear = this.minYear || this.initYear;
    this.maxYear = this.maxYear || this.currentDate.getFullYear() + this.moreYear;
    this.displayFormat = this.displayFormat || 'DD/MM/YYYY';
    this.barTitleFormat = this.barTitleFormat || 'MMMM YYYY';
    this.firstCalendarDay = this.firstCalendarDay || 0;
    this.today = this.today || true;
    this.clear = this.clear || true;
    this.range = this.range || null;
  }

  nextMonth(): void {
    if (!this.range) {
      if (addMonths(this.date, 1) <= new Date(this.currentDate.getFullYear() + this.moreYear, 11, 31) ) {
      this.date = addMonths(this.date, 1);
      this.initDatepicker();
      }
    } else {
      if (addMonths(this.date, 1) <= this.range.maxDate) {
        this.date = addMonths(this.date, 1);
        this.initDatepicker();
      }
    }
  }

  prevMonth(): void {
    if (!this.range) {
      if (subMonths(this.date, 1) >= new Date(this.initYear, 0, 1) ) {
      this.date = subMonths(this.date, 1);
      this.initDatepicker();
      }
    } else {
      if ((subMonths(this.date, 1) >= this.range.minDate)) {
        this.date = subMonths(this.date, 1);
        this.initDatepicker();
      }
    }
  }

  setDate(i: number): void {
    this.date = this.days[i].date;
    this.value = this.date;
    this.initDatepicker();
    this.close();
  }

  setYear(i: number): void {
    if (!this.range) {
      this.date = setYear(this.date, this.years[i].year);
      this.initDatepicker();
      this.initYears();
      this.view = 'days';
    } else {
      const dateTest = new Date(this.years[i].year, this.date.getMonth(), this.date.getDate());
      if (dateTest >= this.range.minDate && dateTest <= this.range.maxDate) {
        this.date = setYear(this.date, this.years[i].year);
        this.initDatepicker();
        this.initYears();
        this.view = 'days';
      }
    }
  }

  private normalDatePick(start: Date, end: Date): void {
    this.days = eachDayOfInterval({
      start: new Date(this.start.getFullYear(), this.start.getMonth(), this.start.getDate())
      , end: new Date(this.end.getFullYear(), this.end.getMonth(), this.end.getDate())
    }).map(date => {
      return {
        date: date,
        day: getDate(date),
        month: getMonth(date),
        year: getYear(date),
        inThisMonth: true,
        isToday: isSameDay(this.currentDate, date),
        isSelected: isSameDay(date, this.value) && isSameMonth(date, this.value) && isSameYear(date, this.value),
        isActive: true
      };
    });
    for (let i = 1; i <= getDay(this.start) - this.firstCalendarDay; i++) {
      const date = subDays(this.start, i);

      this.days.unshift({
        date: date,
        day: getDate(date),
        month: getMonth(date),
        year: getYear(date),
        inThisMonth: false,
        isToday: isSameDay(this.currentDate, date),
        isSelected: isSameDay(date, this.value) && isSameMonth(date, this.value) && isSameYear(date, this.value),
        isActive: true
      });
    }
    if (this.value != null) {
      this.displayValue = format(this.value, this.displayFormat, this.setLang());
    }
    this.barTitle = this.capitalize(format(this.start, this.barTitleFormat, this.setLang()));
  }

  private RangeDatePick(start: Date, end: Date): void {
    this.days = eachDayOfInterval({
      start: new Date(this.start.getFullYear(), this.start.getMonth(), this.start.getDate())
      , end: new Date(this.end.getFullYear(), this.end.getMonth(), this.end.getDate())
    }).map(date => {
      return {
        date: date,
        day: getDate(date),
        month: getMonth(date),
        year: getYear(date),
        inThisMonth: (date >= this.range.minDate && date <= this.range.maxDate ),
        isToday: isSameDay(this.currentDate, date),
        isSelected: isSameDay(date, this.value) && isSameMonth(date, this.value) && isSameYear(date, this.value)
        && (date >= this.range.minDate && date <= this.range.maxDate ),
        isActive: (date >= this.range.minDate && date <= this.range.maxDate )
      };
    });
    for (let i = 1; i <= getDay(this.start) - this.firstCalendarDay; i++) {
      const date = subDays(this.start, i);

      this.days.unshift({
        date: date,
        day: getDate(date),
        month: getMonth(date),
        year: getYear(date),
        inThisMonth: false,
        isToday: isSameDay(this.currentDate, date),
        isSelected: isSameDay(date, this.value) && isSameMonth(date, this.value) && isSameYear(date, this.value)
         && (date >= this.range.minDate && date <= this.range.maxDate ),
        isActive: (date >= this.range.minDate && date <= this.range.maxDate )
      });
    }
    if (this.value != null) {
      this.displayValue = format(this.value, this.displayFormat, this.setLang());
    }
    this.barTitle = this.capitalize(format(this.start, this.barTitleFormat, this.setLang()));
  }

  initDatepicker(): void {
    this.start = startOfMonth(this.date);
    this.end = endOfMonth(this.date);
    if (!this.range) {
      this.normalDatePick(this.start, this.end);
    } else {
      this.RangeDatePick(this.start, this.end);
    }
  }

  initYears(): void {
    const range = this.maxYear - this.minYear + 1;
    this.years = Array.from(new Array(range), (x, i) => i + this.minYear).map(year => {
      return {year: year, isThisYear: year === getYear(this.date)};
    });
  }

  initDayNames(): void {
    this.dayNames = [];
    const start = this.firstCalendarDay;
    for (let i = start; i <= 6 + start; i++) {
      const date = setDay(this.currentDate, i);
      this.dayNames.push(format(date, 'ddd', this.setLang()));
    }

  }

  initMonthNames(): void {
    this.monthsNames = [];
    for (let i = 0; i < +12; i++) {
      const date = setMonth(this.currentDate, i);
      this.monthsNames.push(format(date, 'MMMM', this.setLang()));
    }

  }

  setLang(): Object {
    switch (this.locale) {
      case 'es':
        return {locale: es};
      case 'fr':
        return {locale: fr};
      case 'en':
        return {locale: enUS};
      case 'ar':
        return {locale: ar};

    }
  }

  toggleView(): void {
    this.view = this.view === 'days' ? 'years' : 'days';
  }

  toggle(): void {
    this.ngOnInit();
    this.isOpened = !this.isOpened;
  }

  close(): void {
    this.isOpened = false;
  }

  writeValue(val: Date) {
    if (val) {
      this.value = val;
      this.displayValue = format(this.value, this.displayFormat, this.setLang());
      this.barTitle = this.capitalize(format(startOfMonth(val), this.barTitleFormat, this.setLang()));
      this.initDatepicker();
    }
  }

  @HostListener('document:click', ['$event']) onBlur(e: MouseEvent) {
    if (!this.isOpened) {
      return;
    }

    const input = this.elementRef.nativeElement.querySelector('.ngx-datepicker-input');
    if (e.target === input || input.contains(<any>e.target)) {
      return;
    }

    const container = this.elementRef.nativeElement.querySelector('.ngx-datepicker-calendar-container');
    if (container && container !== e.target && !container.contains(<any>e.target) && !(<any>e.target).classList.contains('year-unit')) {
      this.close();
    }
  }

}

let identifier = 0;
