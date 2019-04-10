import { Component, OnInit, ViewChild } from '@angular/core'
import { MatSidenav } from '@angular/material'
import { CryptService } from '../../core/services/crypt.service'
import { ProjectService } from './project.service'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav

  projects = []

  constructor(private srv: ProjectService) {}

  ngOnInit() {
    this.getProjects()
  }

  getProjects() {
    const id = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    this.srv.getProjects(id).subscribe(d => {
      this.projects = d
    })
  }
  onCreateProject() {}

  eventListener(ev) {
    if (ev === 'close') {
      this.sidenav.close()
    }
  }
}
