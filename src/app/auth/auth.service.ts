import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'
import { auth } from 'firebase/app'
import { UserProfileService } from './user/user-profile.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private userProfileService: UserProfileService,
    private router: Router
  ) {}

  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.socialSignIn(provider)
  }

  private socialSignIn(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(signInDetails => this.userProfileService.saveUserProfileData(signInDetails))
  }

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
  }

  getUser() {
    return this.afAuth.authState
  }

  signOut() {
    return this.afAuth.auth.signOut()
  }
}
