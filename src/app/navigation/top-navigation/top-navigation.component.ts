import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component, Input, OnInit } from '@angular/core'
import { MatSidenav } from '@angular/material'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
})
export class TopNavigationComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches))

  user: any

  @Input()
  sideNav: MatSidenav

  constructor(private breakpointObserver: BreakpointObserver, public router: Router) {}

  ngOnInit() {
    this.setData()
  }

  setData() {}

  logout() {}
}
