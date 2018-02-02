import {Injectable, OnDestroy} from "@angular/core";

import {BlockUI, NgBlockUI} from "ng-block-ui";

import {Observable} from "rxjs/Rx";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class WindowService implements OnDestroy {
  @BlockUI() blockUI: NgBlockUI;

  private responseSubject: BehaviorSubject<any>;
  private response$: Observable<any>;

  private checkWindow: boolean = false;
  private openWindowObject: any = null;
  private config: WindowConfig;

  setConfig(config?: WindowConfig): void {
    if (!config.target) {
      config.target = '_blank';
    }
    if (!config.features) {
      config.features = 'location=yes,height=570,width=962,scrollbars=yes,status=yes';
    }
    this.config = config;
  }

  open(): Observable<any> {
    this.responseSubject = new BehaviorSubject(null);
    this.response$ = this.responseSubject.asObservable();
    this.blockUI.start();
    this.openWindow();
    return this.response$;
  }

  close(): void {
    window.close();
  }

  response(data: any): void {
    const event = new CustomEvent('onResponse', {
      detail: data
    });
    window.dispatchEvent(event);
    window.close();
  }

  private openWindow(): void {

    const base_url = location.origin + '/#';
    this.openWindowObject = window.open(base_url + this.config.url,
      this.config.target, 'location=yes,height=570,width=962,scrollbars=yes,status=yes');
    const _this = this;
    this.openWindowObject.addEventListener('onResponse', function (e) {
      _this.responseSubject.next(e.detail);
    });
    this.checkWindow = true;
    setTimeout(function () {
      _this.fnCheckWindow();
    }, 1000);
  }

  private fnCheckWindow(): void {
    if (this.checkWindow === true) {
      const _this = this;
      if (this.openWindowObject.closed) {
        this.blockUI.stop();
        this.responseSubject.next(null);
      } else {
        setTimeout(function () {
          _this.fnCheckWindow();
        }, 1000);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.responseSubject) {
      this.responseSubject.unsubscribe();
    }
  }
}

export interface WindowConfig {
  url: string;
  target: string;
  features?: string;
  replace?: boolean;
}
