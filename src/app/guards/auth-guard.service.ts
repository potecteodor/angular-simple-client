import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url
    return true // this.checkLogin(url)
  }

  checkLogin(url: string): boolean {
    if (sessionStorage.getItem('mvpAuth') === 'true') {
      // Store the attempted URL for redirecting
      // this.authService.redirectUrl = url
      return true
    }
    console.log('not loggen in')

    // Navigate to the login page with extras
    this.router.navigate(['/login'])
    return false
  }
}
