import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { CryptService } from '../../core/services/crypt.service'
import { UserService } from '../../core/services/user.service'
import { ProfilePopupComponent } from '../../profile-popup/profile-popup.component'
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
  selectedContact = { id: -1, display_name: '', avatar: null }
  messages = {}
  myUser

  constructor(
    private srv: CommunicationService,
    private userSrv: UserService,
    public dialog: MatDialog
  ) {
    const data = CryptService.decrypt(sessionStorage.getItem('userInfo'), true)
    this.myUser = {
      id: data.id,
      display_name: data.display_name,
      avatar: data.avatar,
    }
    this.srv.getCollaborator().subscribe(colabs => {
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

      if (!this.messages[data.from_who.id]) {
        this.messages[data.from_who.id] = []
      }
      if (data.to_who) {
        this.messages[data.from_who.id].push(data)
      }
    })
  }

  openProfile(item) {
    this.userSrv.getOne(item.id).subscribe(d => {
      this.dialog.open(ProfilePopupComponent, {
        width: '400px',
        disableClose: true,
        data: d[0],
      })
    })
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.sendMessage()
    }
  }

  sendMessage() {
    const onlineCollab = this.onlineColabs[this.selectedContact.id]
    this.srv.sendMessageToServer(this.writeText, onlineCollab, this.myUser)
    const data = {
      message: this.writeText,
      to_who: this.selectedContact,
      from_who: this.myUser,
    }
    this.srv.saveMessage(data).subscribe(d => {})
    if (this.selectedContact.id) {
      this.messages[this.selectedContact.id].push({
        from_who: this.myUser,
        message: this.writeText,
      })
    }
    this.writeText = ''
  }

  onContactClick(ev) {
    this.selectedContact = ev
    console.log(this.selectedContact)
    const data = {
      to_who: this.selectedContact,
      from_who: this.myUser,
    }
    if (!this.messages[this.selectedContact.id]) {
      this.messages[this.selectedContact.id] = []
    }
    this.srv.getMessage(data).subscribe(d => {
      if (d && d.length > 0) {
        this.messages[this.selectedContact.id] = d
      }
    })
  }
}
