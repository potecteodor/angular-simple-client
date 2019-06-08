import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms'
import { ErrorStateMatcher, MatDialog, MatSnackBar } from '@angular/material'
import { Router } from '@angular/router'
import { CommonPopupComponent } from '../../../common-popup/common-popup.component'
import { AuthService } from '../auth.service'

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty)
    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent.invalid &&
      control.parent.dirty
    )

    return invalidCtrl || invalidParent
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  registerFormErrors: any
  matcher = new MyErrorStateMatcher()

  public hide = false
  public hide_repeated = false

  constructor(
    private fb: FormBuilder,
    private srv: AuthService,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      display_name: ['', [Validators.required]],
      phone: [''],
      password: ['', [Validators.required]],
    })
  }

  onRegister() {
    this.srv.checkEmail(this.registerForm.get('email').value).subscribe(d => {
      if (d === true) {
        this.srv.register(this.registerForm.getRawValue()).subscribe(d => {
          const dialogRef = this.dialog.open(CommonPopupComponent, {
            width: '400px',
            disableClose: true,
            data: {
              title: 'Register Successful!',
              message: `Please check your email to activate your account!`,
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
        })
      } else {
        this.snackBar.open('This email already exist!', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      }
    })
  }
}
