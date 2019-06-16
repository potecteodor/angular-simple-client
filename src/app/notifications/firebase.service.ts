import { Injectable } from '@angular/core'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { CryptService } from '../core/services/crypt.service'

@Injectable({
  providedIn: 'root',
})
export class FireBaseService {
  notificationList: AngularFireList<any>
  constructor(private firebase: AngularFireDatabase) {
    const id = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    this.notificationList = firebase.list('notifications_' + id)
  }

  getNotifications() {
    return this.notificationList.valueChanges()
  }

  sendNotification(data: any, to: string) {
    this.firebase.list(to).push(data)
  }
}
