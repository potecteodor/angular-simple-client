import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material'
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { CommonPopupComponent } from '../../../common-popup/common-popup.component'
import { BaseHttpService } from '../../../core/services/base-http.service'

@Injectable()
export class AccActivationService implements Resolve<any> {
  urlPrefix = '/auth'
  constructor(
    private http: BaseHttpService<any>,
    public dialog: MatDialog,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise((resolve, reject) => {
      this.http.doPost(this.urlPrefix + '/activate/' + route.params.key).subscribe(d => {
        console.log(d)
        if (!d) {
          const dialogRef = this.dialog.open(CommonPopupComponent, {
            width: '400px',
            disableClose: true,
            data: {
              title: 'Warning',
              message: 'Account already activated!',
              buttons: [
                {
                  type: 'ok',
                  text: 'Ok, thanks!',
                },
              ],
            },
          })
          dialogRef.afterClosed().subscribe((action: any) => {
            if (action === 'ok') {
              this.router.navigate(['/auth'])
            }
          })
          resolve()
        } else {
          const dialogRef = this.dialog.open(CommonPopupComponent, {
            width: '400px',
            disableClose: true,
            data: {
              title: 'Success',
              message: 'Account Activated! You can login now.',
              buttons: [
                {
                  type: 'ok',
                  text: 'Ok, thanks!',
                },
              ],
            },
          })
          dialogRef.afterClosed().subscribe((action: any) => {
            if (action === 'ok') {
              this.router.navigate(['/auth'])
            }
          })
          resolve()
        }
      })
    })
  }
}
