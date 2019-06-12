import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { CryptService } from '../../../core/services/crypt.service'
import { ProjectService } from '../../project/project.service'
import { TaskService } from '../task.service'

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  statuses = ['Not Started', 'Started', 'Testing', 'Completed']
  priorities = ['Low', 'Medium', ' High', 'Urgent']
  @Output()
  eventOutput = new EventEmitter()

  @Input() isEditable

  @Input() task
  members = []
  collaborators = []
  initialTaskName
  userID
  project

  constructor(
    private srv: TaskService,
    // private srvCollab: CollaboratorsService,
    private snackBar: MatSnackBar,
    private pSrv: ProjectService
  ) {}

  ngOnInit() {
    this.userID = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    this.projectSelect()
    this.initialTaskName = this.task.subject
    this.getMembers()
    this.srv.getProject(this.task.id).subscribe(project => {
      this.project = project[0]
    })
  }

  projectSelect() {
    this.pSrv.getProjectMembers(this.task.id).subscribe(d => {
      this.collaborators = d
    })
  }

  /**
   * Compare objects for select
   */
  compareObjects(o1: any, o2: any): boolean {
    return o1 && o2 && o1 === o2
  }

  getMembers() {
    this.srv.getTaskMembers(this.task.id).subscribe(d => {
      console.log(d)
      if (d && d.length > 0) {
        d.map(element => {
          this.members.push(element.id)
        })
      }
    })
  }

  onClose() {
    this.eventOutput.emit('close')
  }

  onEdit() {
    this.srv.checkTaskName(this.task.subject).subscribe(d => {
      if (d === true || this.task.subject === this.initialTaskName) {
        this.srv.editTask(this.task, this.members).subscribe(data => {
          if (data === true) {
            this.eventOutput.emit('edit')
            this.members = []
            this.snackBar.open('Task modified!', '', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            })
          }
        })
      } else {
        this.snackBar.open('You already have a task with this name!', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      }
    })
  }
}
