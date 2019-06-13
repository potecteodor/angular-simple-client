import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatSidenav } from '@angular/material'
import { NavigationEnd, NavigationStart, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('notificationPanel') notificationPanel: MatSidenav

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

  constructor(private breakpointObserver: BreakpointObserver, public router: Router) {
    this.navigationSubscription = router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event  the component
      if (e instanceof NavigationEnd) {
        this.setData()
      }
    })

    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        this.isLoggedIn = sessionStorage.getItem('appAuth') === 'true'
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
    this.isLoggedIn = sessionStorage.getItem('appAuth') === 'true'
  }

  ngOnInit() {
    this.setData()
  }

  notificationToggle(ev) {
    if (ev === 'toggle') {
      this.notificationPanel.toggle()
    }
  }

  onMessageChange(data) {
    this.messages = data
  }

  setData() {}

  logout() {}

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initializedInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe()
    }
  }
}
