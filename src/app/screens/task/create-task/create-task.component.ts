import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { ITask } from '../../../core/interfaces/task.interface'
import { TaskService } from '../task.service'

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  statuses = ['Not Started', 'Started', 'Testing', 'Completed']
  priorities = ['Low', 'Medium', ' High', 'Urgent']

  @Output()
  eventOutput = new EventEmitter()

  task: ITask
  members = []
  collaborators = []

  constructor(
    private srv: TaskService,
    // private srvCollab: CollaboratorsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initProject()
    this.getCollaborators()
  }

  getCollaborators() {
    /* this.srvCollab.getAll().subscribe(d => {
      this.collaborators = d
    }) */
  }

  initProject() {
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
    this.eventOutput.emit('close')
  }

  onAdd() {
    console.log(this.task)
    /*  this.srv.checkProjectName(this.project.name).subscribe(d => {
      if (d === true) {
        this.srv.createProject(this.project, this.members).subscribe(data => {
          if (data === true) {
            this.eventOutput.emit('add')
            this.initProject()
            this.members = []
            this.snackBar.open('Project created!', '', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            })
          }
        })
      } else {
        this.snackBar.open('You already have a project with this name!', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      }
    }) */
  }
}
