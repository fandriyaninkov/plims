import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class PlimsHttpInterceptor implements HttpInterceptor {

  constructor(private _notificationService: NotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this._notificationService.sendErrorMessage('Доступ к приложению приостановлен');
          return throwError(error.message);
        })
      );
  }

}