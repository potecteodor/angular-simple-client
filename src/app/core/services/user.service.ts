import { Injectable } from '@angular/core'
import { BaseHttpService } from './base-http.service'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  urlPrefix = '/user'

  constructor(private bHttp: BaseHttpService<any>) {}

  getOne(id): any {
    return this.bHttp.doGet(this.urlPrefix + '/getOne/' + id)
  }

  changeAvatar(data) {
    return this.bHttp.doPost(this.urlPrefix + '/ChangeAvatar', { data: data })
  }
}
