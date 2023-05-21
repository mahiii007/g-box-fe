import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private msgSvc: MessageService) {}

  public info(details: string, title: string) {
    this.msgSvc.add({
      severity: 'info',
      detail: details,
      summary: title,
      life: 3000,
    });
  }

  public success(details: string, title: string) {
    this.msgSvc.add({
      severity: 'success',
      detail: details,
      summary: title,
      life: 3000,
    });
  }

  public warning(details: string, title?: string) {
    this.msgSvc.add({
      severity: 'warn',
      detail: details,
      summary: title,
      life: 3000,
    });
  }

  public error(details: string, title?: string) {
    this.msgSvc.add({
      severity: 'error',
      detail: details,
      summary: title,
    });
  }

  public clearAll() {
    this.msgSvc.clear();
  }

  public showIfError(e: Error & { userFriendly: boolean; error: Error }) {
    if (e && e.error) {
      this.error(e.error.message || 'OOps! Something went wrong');
    } else if (e && e.message && e.message.toLowerCase().includes('http')) {
      this.error('OOps! Something went wrong');
    } else {
      this.error(e.message || 'OOps! Something went wrong');
    }
  }
}
