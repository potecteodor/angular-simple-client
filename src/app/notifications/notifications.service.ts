import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notificationsNumber = new BehaviorSubject('')
  currentNumber = this.notificationsNumber.asObservable()

  constructor() {}

  updateNotificationNumber(message: number) {
    this.notificationsNumber.next('' + message)
  }
}
