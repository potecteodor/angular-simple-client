import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material'
import { CryptService } from '../../../core/services/crypt.service'
import { AuthService } from '../auth.service'
import { MyErrorStateMatcher } from '../register/register.component'

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent implements OnInit {
  changePasswordForm: FormGroup
  cPass = ''
  hide1 = true
  hide2 = true
  hide3 = true

  matcher = new MyErrorStateMatcher()

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private srv: AuthService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ChangePassComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.changePasswordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        newPasswordConfirm: [''],
      },
      { validator: this.checkPasswords }
    )
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.newPassword.value
    const confirmPass = group.controls.newPasswordConfirm.value

    return pass === confirmPass ? null : { notSame: true }
  }

  onChangePassword() {
    const user = CryptService.decrypt(sessionStorage.getItem('userInfo'), true)
    this.srv
      .checkPassword(
        CryptService.sha1(this.changePasswordForm.get('currentPassword').value),
        user.id
      )
      .subscribe(d => {
        if (d === true) {
          this.srv
            .changePassword(
              CryptService.sha1(this.changePasswordForm.get('newPassword').value),
              user.id
            )
            .subscribe(data => {
              if (data === true) {
                this.dialogRef.close()
                this.snackBar.open('Password changed!', '', {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'bottom',
                })
              }
            })
        } else {
          this.snackBar.open('Current Password is incorrect!', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
        }
      })
  }

  onCancel() {
    this.dialogRef.close()
  }
}
