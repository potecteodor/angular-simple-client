import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core'
import {
  MatDialog,
  MatPaginator,
  MatSidenav,
  MatSnackBar,
  MatSort,
  MatTableDataSource,
} from '@angular/material'
import { Router } from '@angular/router'
import { CommonPopupComponent } from '../../common-popup/common-popup.component'
import { CryptService } from '../../core/services/crypt.service'
import { CreateTaskComponent } from './create-task/create-task.component'
import { TaskService } from './task.service'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskComponent implements OnInit {
  isEditable = false
  @ViewChild('editSidenav') editSidenav: MatSidenav
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  dataSource: MatTableDataSource<any>

  displayedColumns: string[] = [
    'subject',
    'start_date',
    'end_date',
    'priority',
    'status',
    'description',
    'actions',
  ]

  selectedTask = null
  myTasks = []
  otherTasks = []
  allTasks = []
  filterMenuText = 'All Tasks'
  userID

  constructor(
    private srv: TaskService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit() {
    this.userID = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    this.getTasks()
  }

  onTaskClick(task) {
    const pID = CryptService.crypt({ id: task.id })
    this.router.navigate(['/task/detail/' + pID])
  }

  onRowClick(task) {
    this.isEditable = false
    this.selectedTask = task
    this.editSidenav.open()
  }

  /*  onOtherTaskClick(task) {
    const pID = CryptService.crypt({ id: task.task })
    this.router.navigate(['/task/detail/' + pID])
  } */

  getTasks() {
    this.allTasks = []
    const id = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    this.srv.getMyTasks(id).subscribe(d => {
      this.myTasks = d
      d.map(el => {
        this.allTasks.push(el)
      })
      this.srv.getOtherTasks(id).subscribe(otherT => {
        this.otherTasks = otherT
        otherT.map(el => {
          this.allTasks.push(el)
        })
        this.dataSource = new MatTableDataSource(this.allTasks)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      })
    })
  }

  onEdit(task) {
    this.isEditable = true
    this.selectedTask = task
    this.editSidenav.open()
  }

  createTask() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      panelClass: 'addTaskDialog',
    })
    dialogRef.afterClosed().subscribe(action => {
      if (action === 'add') {
        this.getTasks()
      }
    })
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
      this.editSidenav.close()
    }
    if (ev === 'edit') {
      this.editSidenav.close()
      this.selectedTask = null
      this.getTasks()
    }
  }

  filter(filter) {
    if (filter === 'all') {
      this.filterMenuText = 'All Tasks'
      this.dataSource = new MatTableDataSource(this.allTasks)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    }
    if (filter === 'my') {
      this.filterMenuText = 'My Tasks'
      this.dataSource = new MatTableDataSource(this.myTasks)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    }
    if (filter === 'other') {
      this.filterMenuText = 'Other Tasks'
      this.dataSource = new MatTableDataSource(this.otherTasks)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
}
