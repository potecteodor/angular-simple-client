import { Injectable } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from 'angularfire2/firestore'
import { get } from 'lodash'
import { UserProfile } from './user-profile'

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(
    private angularFirestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  getUser() {
    return this.afAuth.authState
  }

  saveUserProfileData(signInDetails: any): Promise<any> {
    const isNewUser = this.get(signInDetails, 'additionalUserInfo.isNewUser')
    if (isNewUser) {
      const userProfile = {
        displayName: this.get(signInDetails, 'user.displayName'),
        email: this.get(signInDetails, 'user.email'),
        emailVerified: this.get(signInDetails, 'user.emailVerified'),
        isAnonymous: this.get(signInDetails, 'user.isAnonymous'),
        phoneNumber: this.get(signInDetails, 'user.phoneNumber'),
        photoURL: this.get(signInDetails, 'user.photoURL'),
        uid: this.get(signInDetails, 'user.uid'),

        credential: {
          providerId: this.get(signInDetails, 'credential.providerId'),
          signInMethod: this.get(signInDetails, 'credential.signInMethod'),
        },

        profile: {
          email: this.get(signInDetails, 'additionalUserInfo.profile.email'),
          family_name: this.get(signInDetails, 'additionalUserInfo.profile.family_name'),
          gender: this.get(signInDetails, 'additionalUserInfo.profile.gender'),
          given_name: this.get(signInDetails, 'additionalUserInfo.profile.given_name'),
          id: this.get(signInDetails, 'additionalUserInfo.profile.id'),
          link: this.get(signInDetails, 'additionalUserInfo.profile.link'),
          locale: this.get(signInDetails, 'additionalUserInfo.profile.locale'),
          name: this.get(signInDetails, 'additionalUserInfo.profile.name'),
          picture: this.get(signInDetails, 'additionalUserInfo.profile.picture'),
          verified_email: this.get(
            signInDetails,
            'additionalUserInfo.profile.verified_email'
          ),
        },
      }
      return this.saveUser(userProfile)
    } else {
      return signInDetails
    }
  }

  private get(obj, property) {
    const val = get(obj, property)
    return val === undefined ? null : val
  }

  private saveUser(user: any): Promise<DocumentReference> {
    const userProfiles: AngularFirestoreCollection<
      UserProfile
    > = this.angularFirestore.collection('userProfiles')
    return userProfiles.add(user)
  }
}
