import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material'
import { ITask } from '../../../core/interfaces/task.interface'
import { CreateTaskComponent } from '../../task/create-task/create-task.component'
import { TaskService } from '../../task/task.service'
import { ProjectService } from '../project.service'

@Component({
  selector: 'app-create-task-in-project',
  templateUrl: './create-task-in-project.component.html',
  styleUrls: ['./create-task-in-project.component.scss'],
})
export class CreateTaskInProjectComponent implements OnInit {
  statuses = ['Not Started', 'Started', 'Testing', 'Completed']
  priorities = ['Low', 'Medium', ' High', 'Urgent']

  task: ITask
  members = []
  collaborators = []
  projectName = ''

  constructor(
    private srv: TaskService,
    private snackBar: MatSnackBar,
    private pSrv: ProjectService,
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.initTask()
    this.task.project_id = data.id
    this.projectName = data.name
    this.getMembers()
  }

  ngOnInit() {}

  getMembers() {
    this.pSrv.getProjectMembers(this.task.project_id).subscribe(d => {
      this.collaborators = d
      this.members = []
    })
  }

  initTask() {
    this.task = {
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
            this.initTask()
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
