import {Injectable} from "@angular/core";
import {NgbDatepickerI18n} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";

const I18N_VALUES = {
  weekdays: [
    'app.base.dia.corto.lu',
    'app.base.dia.corto.ma',
    'app.base.dia.corto.mi',
    'app.base.dia.corto.ju',
    'app.base.dia.corto.vi',
    'app.base.dia.corto.sa',
    'app.base.dia.corto.do'],
  months: [
    'app.base.mes.corto.ene',
    'app.base.mes.corto.feb',
    'app.base.mes.corto.mar',
    'app.base.mes.corto.abr',
    'app.base.mes.corto.may',
    'app.base.mes.corto.jun',
    'app.base.mes.corto.jul',
    'app.base.mes.corto.ago',
    'app.base.mes.corto.sep',
    'app.base.mes.corto.oct',
    'app.base.mes.corto.nov',
    'app.base.mes.corto.dic'
  ],
  // other languages you would support
};

@Injectable()
export class AppDatepickerI18nService extends NgbDatepickerI18n {

  constructor(private translate: TranslateService) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return this.translate.instant(I18N_VALUES.weekdays[weekday - 1]);
  }

  getMonthShortName(month: number): string {
    return this.translate.instant(I18N_VALUES.months[month - 1]);
  }

  getMonthFullName(month: number): string {
    return this.translate.instant(this.getMonthShortName(month));
  }
}
