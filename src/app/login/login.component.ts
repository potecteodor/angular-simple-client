import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  googleLogin() {
    this.authService.googleLogin().then(() => this.navigateToHome())
  }

  anonymousLogin() {
    this.authService.anonymousLogin().then(() => this.navigateToHome())
  }

  navigateToHome() {
    this.router.navigate(['/'])
  }
}
