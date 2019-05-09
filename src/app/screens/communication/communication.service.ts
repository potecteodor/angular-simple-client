import { Injectable } from '@angular/core'
import { ReplaySubject } from 'rxjs'
import * as io from 'socket.io-client'
import { environment } from '../../../environments/environment'
import { BaseHttpService } from '../../core/services/base-http.service'
import { CryptService } from '../../core/services/crypt.service'

@Injectable()
export class CommunicationService {
  messages: ReplaySubject<any> = new ReplaySubject<any>()
  public socket

  constructor(private bHttp: BaseHttpService<any>) {
    this.socket = io(environment.baseUrl)
  }

  getCollaborators() {
    const id = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    return this.bHttp.doGet('/collaborator/getAll/' + id)
  }

  sendMessageToServer(msg, to, from): any {
    this.socket.emit('sendMessage', {
      message: msg,
      to: to,
      from: from,
    })
  }
}
