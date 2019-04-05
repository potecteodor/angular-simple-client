import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog, MatSnackBar } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { CommonPopupComponent } from '../../../common-popup/common-popup.component'
import { AuthService } from '../auth.service'
import { MyErrorStateMatcher } from '../register/register.component'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPassForm: FormGroup
  public hide = false
  public hide_repeated = false
  email: any

  matcher = new MyErrorStateMatcher()

  constructor(
    private fb: FormBuilder,
    public srv: AuthService,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog,
    private ars: ActivatedRoute
  ) {
    ars.data.subscribe(d => {
      this.email = d.data
    })
  }

  ngOnInit() {
    this.resetPassForm = this.fb.group(
      {
        password: ['', [Validators.required]],
        repeat_password: [''],
      },
      { validator: this.checkPasswords }
    )
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value
    const confirmPass = group.controls.repeat_password.value

    return pass === confirmPass ? null : { notSame: true }
  }

  onResetPass() {
    this.srv
      .resetPassword(this.email, this.resetPassForm.get('password').value)
      .subscribe(d => {
        if (d === true) {
          const dialogRef = this.dialog.open(CommonPopupComponent, {
            width: '400px',
            disableClose: true,
            data: {
              title: 'Password changed!',
              message: `You can now login with your new password!`,
              buttons: [
                {
                  type: 'ok',
                  text: 'Ok!',
                },
              ],
            },
          })
          dialogRef.afterClosed().subscribe((action: any) => {
            this.router.navigate(['/auth'])
          })
        }
      })
  }
}
