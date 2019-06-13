import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core'
import { MatDialog, MatSnackBar } from '@angular/material'
import { IProject } from '../../../core/interfaces/project.interface'
import { CryptService } from '../../../core/services/crypt.service'
import { ProfilePopupComponent } from '../../../profile-popup/profile-popup.component'
import { CollaboratorsService } from '../../collaborators/collaborators.service'
import { CreateTaskInProjectComponent } from '../create-task-in-project/create-task-in-project.component'
import { ProjectService } from '../project.service'
import { TaskDetailInProjectComponent } from '../task-detail-in-project/task-detail-in-project.component'

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditProjectComponent implements OnInit, OnChanges {
  @Output()
  eventOutput = new EventEmitter()
  @Input() isEditable

  @Input() project: IProject
  members = []
  membersFullObject = []
  tasks = []
  collaborators = []
  projectOwner
  initialProjectName
  userID

  constructor(
    private srv: ProjectService,
    private srvCollab: CollaboratorsService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userID = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    this.srv.getProjectOwner(this.project.id).subscribe(owner => {
      this.projectOwner = owner[0]
    })
    this.getTasks()
    this.initialProjectName = this.project.name
    this.getCollaborators()
    this.getMembers()
    this.project.start_date = new Date(this.project.start_date)
    this.project.end_date = new Date(this.project.end_date)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.project.previousValue) {
      this.getTasks()
      this.getMembers()
    }
  }

  getTasks() {
    this.srv.getTasks(this.project.id).subscribe(tasks => {
      this.tasks = tasks
    })
  }

  getCollaborators() {
    this.srvCollab.getAll().subscribe(d => {
      this.collaborators = d
    })
  }

  /**
   * Compare objects for select
   */
  compareObjects(o1: any, o2: any): boolean {
    return o1 && o2 && o1 === o2.id
  }

  onMemberClick(member) {
    this.dialog.open(ProfilePopupComponent, {
      width: '400px',
      disableClose: true,
      data: member,
    })
  }

  getMembers() {
    this.membersFullObject = []
    this.members = []
    this.srv.getProjectMembers(this.project.id).subscribe(d => {
      if (d && d.length > 0) {
        d.map(element => {
          this.membersFullObject.push(element)
          this.members.push(element.id)
        })
      }
    })
  }

  onClose() {
    this.eventOutput.emit('close')
    this.isEditable = false
  }

  addTask() {
    const dialogRef = this.dialog.open(CreateTaskInProjectComponent, {
      data: this.project,
      panelClass: 'addTaskDialogClass',
    })
    dialogRef.afterClosed().subscribe(action => {
      this.getTasks()
    })
  }

  onTaskClick(task) {
    const dialogRef = this.dialog.open(TaskDetailInProjectComponent, {
      data: task,
      panelClass: 'addTaskDialogClass',
    })
    dialogRef.afterClosed().subscribe(action => {})
  }

  onEdit() {
    this.srv.checkProjectName(this.project.name).subscribe(d => {
      if (d === true || this.project.name === this.initialProjectName) {
        this.srv.editProject(this.project, this.members).subscribe(data => {
          if (data === true) {
            this.eventOutput.emit('edit')
            this.members = []
            this.snackBar.open('Project modified!', '', {
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
    })
  }
}
