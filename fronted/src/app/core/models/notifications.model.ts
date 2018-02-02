export class Notification {
  type: NotificationType;
  message: string;
  timeout?: number;
}

export enum NotificationType {
  Success,
  Error,
  Info,
  Warning
}
