import { inject, Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);
  private readonly zone = inject(NgZone);
  private readonly duration: number = 3500;

  default(message: string) {
    this.show(message, {
      duration: this.duration,
      panelClass: 'default-notification-overlay'
    });
  }

  info(message: string) {
    this.show(message, {
      duration: this.duration,
      panelClass: 'info-notification-overlay'
    });
  }

  success(message: string) {
    this.show(message, {
      duration: this.duration,
      panelClass: 'success-notification-overlay'
    });
  }

  warn(message: string) {
    this.show(message, {
      duration: this.duration,
      panelClass: 'warning-notification-overlay'
    });
  }

  error(message: string) {
    this.show(message, {
      duration: this.duration,
      panelClass: 'error-notification-overlay'
    });
  }

  private show(message: string, configuration: MatSnackBarConfig) {
    this.zone.run(() => this.snackBar.open(message, 'Cerrar', configuration));
  }
}
