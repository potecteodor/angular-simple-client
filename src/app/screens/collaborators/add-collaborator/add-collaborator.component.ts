import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog, MatSnackBar } from '@angular/material'
import { CommonPopupComponent } from '../../../common-popup/common-popup.component'
import { CryptService } from '../../../core/services/crypt.service'
import { FireBaseService } from '../../../notifications/firebase.service'
import { CollaboratorsService } from '../collaborators.service'

@Component({
  selector: 'app-add-collaborator',
  templateUrl: './add-collaborator.component.html',
  styleUrls: ['./add-collaborator.component.scss'],
})
export class AddCollaboratorComponent implements OnInit {
  @Output()
  eventOutput = new EventEmitter()

  collaboratorFrom: FormGroup
  constructor(
    private fb: FormBuilder,
    private srv: CollaboratorsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private fbSrv: FireBaseService
  ) {}

  ngOnInit() {
    this.collaboratorFrom = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  onClose() {
    this.collaboratorFrom.patchValue({ email: '' })
    this.eventOutput.emit('close')
  }

  onAdd() {
    this.srv.checkEmail(this.collaboratorFrom.get('email').value).subscribe(d => {
      if (d) {
        if (d === 'exist') {
          this.snackBar.open('Collaborator already exist!', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
        } else {
          const dialogRef = this.dialog.open(CommonPopupComponent, {
            width: '400px',
            disableClose: true,
            data: {
              title: 'User found!',
              message: `Are you sure you want to add ${
                d.display_name
              } <br/>to your collaborators?`,
              buttons: [
                {
                  type: 'ok',
                  text: 'Yes!',
                },
                {
                  type: 'no',
                  text: 'No!',
                },
              ],
            },
          })
          dialogRef.afterClosed().subscribe((action: any) => {
            if (action === 'ok') {
              this.srv.addCollaborator(d.id).subscribe(data => {
                const myUser = CryptService.decrypt(
                  sessionStorage.getItem('userInfo'),
                  true
                )
                const notifyData = {
                  type: 'Collaborator',
                  title: 'New Collaborator!',
                  message: myUser.display_name + ' has added you as a collaborator!',
                  status: 'unread',
                  from: myUser,
                  url: 'collaborators',
                }
                notifyData['time'] = '' + new Date()
                this.fbSrv.sendNotification(notifyData, 'notifications_' + d.id)
                if (data) {
                  this.onClose()
                  this.eventOutput.emit('add')
                  this.snackBar.open('Collaborator Added!', '', {
                    duration: 3000,
                    horizontalPosition: 'right',
                    verticalPosition: 'bottom',
                  })
                }
              })
            }
          })
        }
      } else {
        const dialogRef = this.dialog.open(CommonPopupComponent, {
          width: '400px',
          disableClose: true,
          data: {
            title: 'This email is not registered!',
            message: `Would you like to send an registration invite to this email?`,
            buttons: [
              {
                type: 'ok',
                text: 'Yes!',
              },
              {
                type: 'no',
                text: 'No!',
              },
            ],
          },
        })
        dialogRef.afterClosed().subscribe((action: any) => {
          if (action === 'ok') {
            this.srv.invite(this.collaboratorFrom.get('email').value).subscribe(data => {
              if (data) {
                this.onClose()
                this.snackBar.open('Collaborator Invited!', '', {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'bottom',
                })
              }
            })
          }
        })
      }
    })
  }
}
