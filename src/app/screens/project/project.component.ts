import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatSidenav, MatSnackBar } from '@angular/material'
import { Router } from '@angular/router'
import { CommonPopupComponent } from '../../common-popup/common-popup.component'
import { CryptService } from '../../core/services/crypt.service'
import { ProjectService } from './project.service'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav
  @ViewChild('editSidenav') editSidenav: MatSidenav

  selectedProject = null
  myProjects = []
  otherProjects = []

  constructor(
    private srv: ProjectService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit() {
    this.getProjects()
  }

  onProjectClick(project) {
    const pID = CryptService.crypt({ id: project.id })
    this.router.navigate(['/project/detail/' + pID])
  }

  onOtherProjectClick(project) {
    const pID = CryptService.crypt({ id: project.project_id })
    this.router.navigate(['/project/detail/' + pID])
  }

  getProjects() {
    const id = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    this.srv.getMyProjects(id).subscribe(d => {
      this.myProjects = d
    })
    this.srv.getOtherProjects(id).subscribe(d => {
      this.otherProjects = d
    })
  }
  onCreateProject() {}

  onEdit(project) {
    this.selectedProject = project
    this.editSidenav.open()
  }
  onDelete(project) {
    const dialogRef = this.dialog.open(CommonPopupComponent, {
      width: '400px',
      disableClose: true,
      data: {
        title: 'Warning!',
        message: `Are you sure you want to remove this project?`,
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
        this.srv.deleteProject(project.id).subscribe(d => {
          if (d) {
            this.getProjects()
            this.snackBar.open('Project Removed!', '', {
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
      this.getProjects()
    }
    if (ev === 'edit') {
      this.editSidenav.close()
      this.selectedProject = null
      this.getProjects()
    }
  }
}
