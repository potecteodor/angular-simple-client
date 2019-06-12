import { Component, Inject, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ITask } from '../../../core/interfaces/task.interface'
import { CryptService } from '../../../core/services/crypt.service'
import { ProjectService } from '../../project/project.service'
import { TaskService } from '../task.service'

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  statuses = ['Not Started', 'Started', 'Testing', 'Completed']
  priorities = ['Low', 'Medium', ' High', 'Urgent']

  task: ITask
  members = []
  collaborators = []
  projects = []

  constructor(
    private srv: TaskService,
    private pSrv: ProjectService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.getProjects()
    this.initProject()
  }

  projectSelect(ev) {
    this.pSrv.getProjectMembers(ev.value).subscribe(d => {
      this.collaborators = d
      this.members = []
    })
  }

  getProjects() {
    const id = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    this.pSrv.getMyProjects(id).subscribe(d => {
      this.projects = d
    })
  }

  initProject() {
    this.task = {
      project_id: null,
      subject: '',
      priority: '',
      status: '',
      start_date: null,
      end_date: null,
      description: '',
    }
  }

  onClose() {
    this.dialogRef.close('close')
  }

  onAdd() {
    this.srv.checkTaskName(this.task.subject).subscribe(d => {
      if (d === true) {
        this.srv.createTask(this.task, this.members).subscribe(data => {
          if (data === true) {
            this.dialogRef.close('add')
            this.initProject()
            this.members = []
            this.snackBar.open('Task created!', '', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            })
          }
        })
      } else {
        this.snackBar.open('You already have a task with this subject!', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      }
    })
  }
}
