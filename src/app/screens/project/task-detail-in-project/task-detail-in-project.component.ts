import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material'
import { ITask } from '../../../core/interfaces/task.interface'
import { TaskService } from '../../task/task.service'
import { ProjectService } from '../project.service'

@Component({
  selector: 'app-task-detail-in-project',
  templateUrl: './task-detail-in-project.component.html',
  styleUrls: ['./task-detail-in-project.component.scss'],
})
export class TaskDetailInProjectComponent implements OnInit {
  task: ITask
  members = []

  constructor(
    private srv: TaskService,
    private snackBar: MatSnackBar,
    private pSrv: ProjectService,
    public dialogRef: MatDialogRef<TaskDetailInProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.task = data
    this.srv.getTaskMembers(this.task.id).subscribe(d => {
      this.members = d
    })
  }

  ngOnInit() {}

  onClose() {
    this.dialogRef.close('close')
  }
}
