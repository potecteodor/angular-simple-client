import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatSidenav, MatSnackBar } from '@angular/material'
import { Router } from '@angular/router'
import { CommonPopupComponent } from '../../common-popup/common-popup.component'
import { CryptService } from '../../core/services/crypt.service'
import { TaskService } from './task.service'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav
  @ViewChild('editSidenav') editSidenav: MatSidenav

  selectedTask = null
  myTasks = []
  otherTasks = []

  constructor(
    private srv: TaskService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit() {
    this.getTasks()
  }

  onTaskClick(task) {
    const pID = CryptService.crypt({ id: task.id })
    this.router.navigate(['/task/detail/' + pID])
  }

  onOtherTaskClick(task) {
    const pID = CryptService.crypt({ id: task.task })
    this.router.navigate(['/task/detail/' + pID])
  }

  getTasks() {
    const id = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    this.srv.getMyTasks(id).subscribe(d => {
      this.myTasks = d
    })
    this.srv.getOtherTasks(id).subscribe(d => {
      this.otherTasks = d
    })
  }

  onEdit(task) {
    this.selectedTask = task
    this.editSidenav.open()
  }
  onDelete(task) {
    const dialogRef = this.dialog.open(CommonPopupComponent, {
      width: '400px',
      disableClose: true,
      data: {
        title: 'Warning!',
        message: `Are you sure you want to remove this task?`,
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
        this.srv.deleteTask(task.id).subscribe(d => {
          if (d) {
            this.getTasks()
            this.snackBar.open('Task Removed!', '', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            })
          }
        })
      }
    })
  }

  eventListener(ev) {
    if (ev === 'close') {
      this.sidenav.close()
      this.editSidenav.close()
    }
    if (ev === 'add') {
      this.sidenav.close()
      this.getTasks()
    }
    if (ev === 'edit') {
      this.editSidenav.close()
      this.selectedTask = null
      this.getTasks()
    }
  }
}
