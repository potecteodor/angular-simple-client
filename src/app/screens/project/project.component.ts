import { Component, OnInit } from '@angular/core'
import { CryptService } from '../../core/services/crypt.service'
import { ProjectService } from './project.service'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
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
}
