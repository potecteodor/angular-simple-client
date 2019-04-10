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

  delete(collab_id): any {
    const my_id = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    const data = {
      my_id: my_id,
      collab_id: collab_id,
    }
    return this.bHttp.doPost(this.urlPrefix + '/delete', { data: data })
  }

  checkEmail(email): any {
    const id = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    return this.bHttp.doPost(this.urlPrefix + '/checkEmail', { my_id: id, email: email })
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
