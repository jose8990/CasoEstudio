import {OnInit} from "@angular/core";
import {NgModel} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

import {Observable} from "rxjs";

import {ValueAccessorBase} from "./value-accessor";

import {AsyncValidatorArray, message, validate, ValidationResult, ValidatorArray} from "./validate";

export abstract class ElementBase<T> extends ValueAccessorBase<T> implements OnInit {
  public abstract model: NgModel;
  public init: boolean;

  constructor(private validators: ValidatorArray,
              private asyncValidators: AsyncValidatorArray,
              private translate: TranslateService) {
    super();
  }

  public validate(): Observable<ValidationResult> {
    return validate
    (this.validators, this.asyncValidators)
    (this.model.control);
  }

  public get isvalid(): Observable<boolean> {
    return this.validate().map(v => Object.keys(v || {}).length === 0);
  }

  public get invalid(): Observable<boolean> {
    return this.validate().map(v => Object.keys(v || {}).length > 0);
  }

  public get failures(): Observable<Array<string>> {
    return this.validate().map(v => Object.keys(v).map(k => {
      return message(v, k);
    }).map(m => {
      /**
       * Las validaciones required del sistema de formulario se remplasan por la directiva RequiredValidatorDirective
       * Se remplasa porque en los componentes select la opcion --Seleccione-- sale como valida con el required del input.
       * La directiva RequiredValidatorDirective soluciona este problema.
       */
      if (m === 'app.base.validaciones.required') {
        return null;
      }
      return this.translate.instant(m);
    }));
  }

  public check() {
    this.init = false;
  }

  ngOnInit() {
    this.init = true;
  }
}
