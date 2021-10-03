import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {}

  sendErrorMessage(message: string) {
    this.toastr.error(message, 'Ошибка!');
  }

  sendCreateElementMessage(message: string) {
    this.toastr.success(message, 'Это успех!');
  }

  sendEditElementMessage(message: string) {
    this.toastr.info(message, 'Отредактировано!');
  }

  sendDeleteElementMessage(message: string) {
    this.toastr.info(message, 'Удалено!');
  }

}
