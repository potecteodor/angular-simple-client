import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url
    return true // this.checkLogin(url)
  }

  checkLogin(url: string): boolean {
    if (sessionStorage.getItem('appAuth') === 'true') {
      // Store the attempted URL for redirecting
      // this.authService.redirectUrl = url
      return true
    }
    console.log('not logged in')

    // Navigate to the login page with extras
    this.router.navigate(['/login'])
    return false
  }
}
