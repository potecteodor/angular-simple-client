import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  public hide = false
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      display_name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repeat_password: ['', Validators.required],
    })
  }
  onRegister() {
    console.log(this.registerForm.getRawValue())
  }
}
