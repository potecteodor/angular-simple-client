import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material'
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { BaseHttpService } from '../../../core/services/base-http.service'
import { CryptService } from '../../../core/services/crypt.service'
import { AuthService } from '../auth.service'

@Injectable()
export class ResetPasswordService implements Resolve<any> {
  urlPrefix = '/auth'
  constructor(
    private http: BaseHttpService<any>,
    public dialog: MatDialog,
    private router: Router,
    private srv: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise((resolve, reject) => {
      const email = CryptService.decrypt(route.params.key, true).key
      this.srv.checkEmail(email).subscribe(d => {
        if (!d) {
          resolve(email)
        }
      })
    })
  }
}
