import { Injectable } from '@angular/core'
import { BaseHttpService } from '../../core/services/base-http.service'

@Injectable()
export class AuthService {
  urlPrefix = '/auth'

  constructor(private bHttp: BaseHttpService<any>) {}

  resetPassword(email, password): any {
    return this.bHttp.doPost(this.urlPrefix + '/resetPassword', {
      email: email,
      password: password,
    })
  }

  forgotPassword(email): any {
    return this.bHttp.doPost(this.urlPrefix + '/forgotPassword', { email: email })
  }

  checkEmail(email): any {
    return this.bHttp.doPost(this.urlPrefix + '/checkEmail', { email: email })
  }

  register(data): any {
    return this.bHttp.doPost(this.urlPrefix + '/register', data)
  }

  login(data): any {
    return this.bHttp.doPost(this.urlPrefix + '/login', data)
  }

  resendEmail(email): any {
    return this.bHttp.doPost(this.urlPrefix + '/resendActivation', { email: email })
  }
}
