import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CryptService } from '../../core/services/crypt.service'
import { CollaboratorsService } from '../collaborators/collaborators.service'
import { ProjectService } from '../project/project.service'
import { TaskService } from '../task/task.service'
import { DashboardService } from './dashboard.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  projects = []
  collabs = []
  tasks = []
  constructor(
    private srv: DashboardService,
    private router: Router,
    private collabSrv: CollaboratorsService,
    private taskSrv: TaskService,
    private projectSrv: ProjectService
  ) {}

  ngOnInit() {
    this.getProjects()
    this.getCollaborators()
    this.getTasks()
  }

  goTo(url) {
    this.router.navigate([url])
  }

  getProjects() {
    const id = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    this.projectSrv.getMyProjects(id).subscribe(d => {
      d.map((el, index) => {
        if (index < 4) {
          this.projects.push(el)
        }
      })
    })
  }
  getCollaborators() {
    this.collabSrv.getAll().subscribe(d => {
      d.map((el, index) => {
        if (index < 4) {
          this.collabs.push(el)
        }
      })
    })
  }
  getTasks() {
    const id = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    this.taskSrv.getMyTasks(id).subscribe(d => {
      d.map((el, index) => {
        if (index < 4) {
          this.tasks.push(el)
        }
      })
    })
  }
}
