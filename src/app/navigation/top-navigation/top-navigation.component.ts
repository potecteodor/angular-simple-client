import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component, Input, OnInit } from '@angular/core'
import { MatDialog, MatSidenav, MatSnackBar } from '@angular/material'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { CryptService } from '../../core/services/crypt.service'
import { ChangePassComponent } from '../../screens/auth/change-pass/change-pass.component'

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

  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.setData()
  }

  setData() {
    this.user = CryptService.decrypt(sessionStorage.getItem('userInfo'), true)
  }

  changePass() {
    this.dialog.open(ChangePassComponent, {
      width: '300px',
      disableClose: true,
    })
  }

  logout() {
    sessionStorage.removeItem('userInfo')
    this.router.navigate(['/auth'])
  }
}
