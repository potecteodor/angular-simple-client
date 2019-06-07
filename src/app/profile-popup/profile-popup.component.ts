import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.scss'],
})
export class ProfilePopupComponent implements OnInit {
  imageSrc = 'assets/images/default-profile.png'

  userProfile = {
    display_name: '',
    avatar: '',
    email: '',
    phone: '',
  }

  constructor(
    public dialogRef: MatDialogRef<ProfilePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.userProfile = this.data
  }

  onBtnClick(type): void {
    this.dialogRef.close(type)
  }
}
