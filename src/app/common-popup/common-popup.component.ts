import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-common-popup',
  templateUrl: './common-popup.component.html',
  styleUrls: ['./common-popup.component.scss'],
})
export class CommonPopupComponent implements OnInit {
  message: String = 'Confirm'
  title: String = 'Message'

  buttons = [
    {
      type: 'no',
      text: 'Cancel',
    },
    {
      type: 'ok',
      text: 'Ok',
    },
  ]

  constructor(
    public dialogRef: MatDialogRef<CommonPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    if (this.data.buttons) {
      this.buttons = this.data.buttons
    }
    this.title = this.data.title
    this.message = this.data.message
  }

  onBtnClick(type): void {
    this.dialogRef.close(type)
  }
}
