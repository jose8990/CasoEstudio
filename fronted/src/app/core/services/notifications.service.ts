import {EventEmitter, Injectable} from "@angular/core";
import {NavigationStart, Router} from "@angular/router";
import {Notification, NotificationType} from "../models";

@Injectable()
export class NotificationsService {
  public notifications: EventEmitter<Notification> = new EventEmitter<Notification>();
  public clear: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clearNotifications();
        }
      }
    });
  }

  public success(message: string, keepAfterRouteChange = true) {
    this.alert(NotificationType.Success, message, keepAfterRouteChange);
  }

  public error(message: string, keepAfterRouteChange = true) {
    this.alert(NotificationType.Error, message, keepAfterRouteChange);
  }

  public info(message: string, keepAfterRouteChange = true) {
    this.alert(NotificationType.Info, message, keepAfterRouteChange);
  }

  public warn(message: string, keepAfterRouteChange = true) {
    this.alert(NotificationType.Warning, message, keepAfterRouteChange);
  }

  private alert(type: NotificationType, message: string, keepAfterRouteChange = true) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.notifications.emit({type: type, message: message});
  }

  public clearNotifications() {
    this.clear.emit(true);
  }
}
