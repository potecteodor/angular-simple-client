import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { BaseHttpService } from '../core/services/base-http.service'
import { CryptService } from '../core/services/crypt.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router, private bHttp: BaseHttpService<any>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (sessionStorage.getItem('userInfo')) {
      const k = CryptService.decrypt(sessionStorage.getItem('userInfo'), true)
      if (k && k.id) {
        return true
      } else {
        this.router.navigate(['/auth'])
        return false
      }
    } else {
      this.router.navigate(['/auth'])
      return false
    }
  }
}
