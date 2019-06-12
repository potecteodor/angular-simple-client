import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { IProject } from '../../../core/interfaces/project.interface'
import { CryptService } from '../../../core/services/crypt.service'
import { CollaboratorsService } from '../../collaborators/collaborators.service'
import { ProjectService } from '../project.service'

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {
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
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userID = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    this.srv.getProjectOwner(this.project.id).subscribe(owner => {
      this.projectOwner = owner[0]
    })
    this.srv.getTasks(this.project.id).subscribe(tasks => {
      this.tasks = tasks
    })
    this.initialProjectName = this.project.name
    this.getCollaborators()
    this.getMembers()
    this.project.start_date = new Date(this.project.start_date)
    this.project.end_date = new Date(this.project.end_date)
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

  getMembers() {
    this.srv.getProjectMembers(this.project.id).subscribe(d => {
      if (d && d.length > 0) {
        d.map(element => {
          this.membersFullObject.push(element)
          this.members.push(element.id)
        })
      }
      console.log(this.members)
    })
  }

  onClose() {
    this.eventOutput.emit('close')
    this.isEditable = false
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
