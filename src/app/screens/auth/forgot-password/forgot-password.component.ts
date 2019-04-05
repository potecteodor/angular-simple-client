import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog, MatSnackBar } from '@angular/material'
import { Router } from '@angular/router'
import { CommonPopupComponent } from '../../../common-popup/common-popup.component'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassForm: FormGroup
  public hide = false
  constructor(
    private fb: FormBuilder,
    public srv: AuthService,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.forgotPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  onResetPass() {
    this.srv.checkEmail(this.forgotPassForm.get('email').value).subscribe(d => {
      if (!d) {
        this.srv.forgotPassword(this.forgotPassForm.get('email').value).subscribe(res => {
          if (res === true) {
            const dialogRef = this.dialog.open(CommonPopupComponent, {
              width: '400px',
              disableClose: true,
              data: {
                title: 'Reset Password mail sent!',
                message: `Please check your email to reset your password!`,
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
      } else {
        this.snackBar.open('This email is not registered!', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      }
    })
  }
}
