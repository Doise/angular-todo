import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackbar: MatSnackBar) {}

  /**
   * Shows a notification message on the screen.
   * 
   * @param { string } message The notification message.
   * @param { string | undefined } action The action title to show.
   */
  showNotification = (message: string, action: string | undefined): Observable<void> | undefined => {
    this.snackbar.open(message, action, { duration: 2000 })
    return this.snackbar._openedSnackBarRef?.onAction()
  }
}