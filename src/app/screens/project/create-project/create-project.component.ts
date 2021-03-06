import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { IProject } from '../../../core/interfaces/project.interface'
import { CollaboratorsService } from '../../collaborators/collaborators.service'
import { ProjectService } from '../project.service'

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  @Output()
  eventOutput = new EventEmitter()

  project: IProject
  members = []
  collaborators = []

  constructor(
    private srv: ProjectService,
    private srvCollab: CollaboratorsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initProject()
    this.getCollaborators()
  }

  getCollaborators() {
    this.srvCollab.getAll().subscribe(d => {
      this.collaborators = d
    })
  }

  initProject() {
    this.project = {
      name: '',
      start_date: null,
      end_date: null,
      description: '',
    }
  }

  onClose() {
    this.eventOutput.emit('close')
  }

  onAdd() {
    this.srv.checkProjectName(this.project.name).subscribe(d => {
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
    })
  }
}
