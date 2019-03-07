import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core'
import { NavigationEnd, NavigationStart, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ActTime Business Platform'

  user: any

  loading = true

  navigationSubscription: any

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches))

  messages: string[] = []

  @HostBinding('class')
  componentCssClass = 'default-theme'
  isLoggedIn: boolean

  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private authService: AuthService
  ) {
    this.navigationSubscription = router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event  the component
      if (e instanceof NavigationEnd) {
        this.setData()
      }
    })

    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        this.isLoggedIn = sessionStorage.getItem('mvpAuth') === 'true'
        this.loading = true
      }
      if (event instanceof NavigationEnd) {
        this.loading = false
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    })
    this.isLoggedIn = sessionStorage.getItem('mvpAuth') === 'true'
  }

  ngOnInit() {
    this.setData()
  }

  onMessageChange(data) {
    this.messages = data
  }

  setData() {
    this.authService.getUser().subscribe(user => {
      this.user = user
    })
  }

  logout() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/'])
    })
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe()
    }
  }
}
