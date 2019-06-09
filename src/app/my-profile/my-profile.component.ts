import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { environment } from '../../environments/environment'
import { UserService } from '../core/services/user.service'

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  /* [filesProperty] = "'files'"[data] = "task"[entity] = "'task'" */
  imageSrc = 'assets/images/default-profile.png'
  @Input() filesProperty = 'files'
  @Input() dataFile = {}
  @Input() entity = ''
  @ViewChild('fileUploadQueue') fileUploadQueue
  public serverUrl = environment.baseUrl + '/user/changeAvatar'
  public downloadUrl = environment.baseUrl + 'download/'
  httpHeaders = {}

  selectedPicture: File = null

  userProfile = {
    id: 0,
    display_name: '',
    avatar: null,
    email: '',
    phone: '',
  }

  constructor(
    public dialogRef: MatDialogRef<MyProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public srv: UserService
  ) {}

  ngOnInit() {
    this.userProfile = this.data
  }

  afterUpload(ev: any) {
    const e = ev.event
    if (ev.event && ev.event.body) {
      if (!this.dataFile[this.filesProperty]) {
        this.dataFile[this.filesProperty] = []
      }
      this.dataFile[this.filesProperty].push(ev.event.body)
      this.fileUploadQueue.files = this.fileUploadQueue.files.filter(
        file => !(file.name === ev.file.name && file.size === ev.file.size)
      )
    }
  }

  fileOpen(event) {
    this.selectedPicture = event.target.files[0]
  }

  onSave() {
    const formData = new FormData()
    formData.append('file', this.selectedPicture)
    this.srv.changeAvatar(formData).subscribe(d => {
      console.log(d)
    })
  }

  onBtnClick(type): void {
    this.dialogRef.close(this.userProfile)
  }
}
