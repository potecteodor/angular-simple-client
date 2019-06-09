import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component, Input, OnInit } from '@angular/core'
import { MatDialog, MatSidenav, MatSnackBar } from '@angular/material'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { CryptService } from '../../core/services/crypt.service'
import { UserService } from '../../core/services/user.service'
import { MyProfileComponent } from '../../my-profile/my-profile.component'
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
    public snackBar: MatSnackBar,
    public userSrv: UserService
  ) {}

  ngOnInit() {
    this.setData()
    this.userSrv.getOne(this.user.id).subscribe(d => {
      if (d[0].avatar !== this.user.avatar) {
        this.user = d[0]
      }
    })
  }

  onProfile() {
    this.userSrv.getOne(this.user.id).subscribe(d => {
      const dialogRef = this.dialog.open(MyProfileComponent, {
        width: 'auto',
        disableClose: true,
        data: d[0],
      })
      dialogRef.afterClosed().subscribe(d => {
        this.user = d
        sessionStorage.setItem('userInfo', CryptService.crypt(d))
      })
    })
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
