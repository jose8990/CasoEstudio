import {Component, OnInit, SecurityContext} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {Notification, NotificationType} from "../../../models";
import {NotificationsService} from "../../../services";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
})
export class Notifications implements OnInit {

  public alerts: any = [];

  public constructor(private sanitizer: DomSanitizer,
                     private notificationsService: NotificationsService) {
    this.notificationsService.notifications.subscribe(
      (notification: Notification) => {
        let type: string = '';

        switch (notification.type) {
          case NotificationType.Success:
            type = 'success';
            break;
          case NotificationType.Info:
            type = 'info';
            break;
          case NotificationType.Error || NotificationType.Warning:
            type = 'danger';
            break;
        }

        this.alerts.push({
          type: type,
          msg: sanitizer.sanitize(SecurityContext.HTML, notification.message),
          timeout: notification.timeout || 5000
        });
      });

    this.notificationsService.clear.subscribe(
      (clear: boolean) => {
        if (clear === true) {
          this.alerts = [];
        }
      }
    );
  }

  ngOnInit() {
    this.alerts = this.alerts.map((alert: any) => ({
      type: alert.type,
      msg: this.sanitizer.sanitize(SecurityContext.HTML, alert.msg)
    }));
  }
}
