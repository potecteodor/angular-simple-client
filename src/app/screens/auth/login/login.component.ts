import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog, MatSnackBar } from '@angular/material'
import { Router } from '@angular/router'
import { CommonPopupComponent } from '../../../common-popup/common-popup.component'
import { CryptService } from '../../../core/services/crypt.service'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  public hide = false
  constructor(
    private fb: FormBuilder,
    public srv: AuthService,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }
  onLogin() {
    this.srv.login(this.loginForm.getRawValue()).subscribe(result => {
      if (!result) {
        this.snackBar.open('Email and password combination incorrect!', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      } else if (result === 'unconfirmed') {
        const dialogRef = this.dialog.open(CommonPopupComponent, {
          width: '400px',
          disableClose: true,
          data: {
            title: 'Account not activated!',
            message: `Please check your email to activate your account!<br/>
                      Would you like to resend the activation email?`,
            buttons: [
              {
                type: 'ok',
                text: 'Resend Activation email!',
              },
              {
                type: 'no',
                text: 'Cancel!',
              },
            ],
          },
        })
        dialogRef.afterClosed().subscribe((action: any) => {
          if (action === 'ok') {
            this.srv.resendEmail(this.loginForm.get('email').value).subscribe(d => {
              if (d) {
                this.snackBar.open('Activation email sent!', '', {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'bottom',
                })
              }
            })
          }
        })
      } else {
        sessionStorage.setItem('userInfo', CryptService.crypt(result))
        this.router.navigate(['/'])
      }
    })
  }
}
