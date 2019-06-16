import { Component, OnInit } from '@angular/core'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material'
import { Router } from '@angular/router'
import { FireBaseService } from './firebase.service'
import { NotificationsService } from './notifications.service'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications = []
  ok = false

  notificationsNumber = 0

  constructor(
    private firebaseService: FireBaseService,
    public snackBar: MatSnackBar,
    public router: Router,
    public nSrv: NotificationsService
  ) {}

  ngOnInit() {
    this.firebaseService.getNotifications().subscribe(d => {
      this.notifications = []
      this.notificationsNumber = 0
      d.map(el => {
        el.time = new Date(el.time)
        this.notifications.unshift(el)
        if (el.status === 'unread') {
          this.notificationsNumber++
          this.nSrv.updateNotificationNumber(this.notificationsNumber)
        }
      })

      if (this.ok) {
        let config = new MatSnackBarConfig()
        config = {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        }
        config.panelClass = ['custom-class']
        this.snackBar.open(
          d[d.length - 1].type + ' notification: ' + d[d.length - 1].message,
          '',
          config
        )
      } else {
        this.ok = true
      }
    })
  }

  goTo(url) {
    this.router.navigate([url])
  }
}
