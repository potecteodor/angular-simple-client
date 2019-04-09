import { Injectable } from '@angular/core'
import { BaseHttpService } from '../../core/services/base-http.service'
import { CryptService } from '../../core/services/crypt.service'

@Injectable()
export class CollaboratorsService {
  urlPrefix = '/collaborator'

  constructor(private bHttp: BaseHttpService<any>) {}

  getAll() {
    const id = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    return this.bHttp.doGet(this.urlPrefix + '/getAll/' + id)
  }
  checkEmail(email): any {
    return this.bHttp.doPost(this.urlPrefix + '/checkEmail', { email: email })
  }

  addCollaborator(collab_id): any {
    const id = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    return this.bHttp.doPost(this.urlPrefix + '/addCollaborator', {
      collab_id: collab_id,
      my_id: id,
    })
  }

  invite(email): any {
    const id = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    return this.bHttp.doPost(this.urlPrefix + '/invite', {
      email: email,
      id: id,
    })
  }
}
