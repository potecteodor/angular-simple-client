import { Component, OnInit } from '@angular/core'
import { CryptService } from '../../core/services/crypt.service'
import { CommunicationService } from './communication.service'

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss'],
})
export class CommunicationComponent implements OnInit {
  collaborators = []
  onlineColabs = []
  writeText
  selectedContact = { collab_id: -1, id: -1, display_name: '' }
  messages = {}
  myUser

  constructor(private srv: CommunicationService) {
    this.myUser = CryptService.decrypt(sessionStorage.getItem('userInfo'), true)
    this.srv.getCollaborators().subscribe(colabs => {
      this.collaborators = colabs
    })
  }

  ngOnInit() {
    this.srv.socket.emit('join', this.myUser)
    this.srv.socket.on('friendsListChanged', data => {
      this.onlineColabs = []
      data.map(elem => {
        this.onlineColabs[elem.id] = elem
      })
    })

    this.srv.socket.on('messageReceived', data => {
      console.log('Received message from Websocket Server', data)

      if (!this.messages[data.from.id]) {
        this.messages[data.from.id] = []
      }
      if (data.to) {
        this.messages[data.from.id].push(data)
      }
    })
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.sendMessage()
    }
  }

  sendMessage() {
    const onlineCollab = this.onlineColabs[this.selectedContact.collab_id]
    /* if (
      (onlineContact && onlineContact.uid && onlineContact.uid > 0) ||
      this.selectedContact.id === -1
    ) { */
    this.srv.sendMessageToServer(this.writeText, onlineCollab, this.myUser)
    /*     } */
    if (this.selectedContact.collab_id) {
      this.messages[this.selectedContact.collab_id].push({
        from: this.myUser,
        message: this.writeText,
      })
    }
    console.log(this.messages[this.selectedContact.collab_id])
    this.writeText = ''
  }

  onContactClick(ev) {
    this.selectedContact = ev
    const data = {
      to: this.selectedContact,
      from: this.myUser,
    }
    if (!this.messages[this.selectedContact.collab_id]) {
      this.messages[this.selectedContact.collab_id] = []
    }
    /* this.srv.getMessages(data).subscribe(d => {
      this.messages[this.selectedContact.id] = []
      d.forEach(element => {
        this.messages[this.selectedContact.id].push(element)
      })
    }) */
  }
}
