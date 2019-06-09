import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CryptService } from '../../core/services/crypt.service'
import { CollaboratorsService } from '../collaborators/collaborators.service'
import { ProjectService } from '../project/project.service'
import { TaskService } from '../task/task.service'
import { DashboardService } from './dashboard.service'

declare var google: any

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
  ) {
    google.charts.load('current', { packages: ['timeline'] })
  }

  ngOnInit() {
    this.getProjects()
    this.getCollaborators()
    this.getTasks()
    this.createChart()
  }

  // read more at: https://developers.google.com/chart/interactive/docs/gallery/timeline
  createChart() {
    function drawChart() {
    const container = document.getElementById('elementId')
    const chart = new google.visualization.Timeline(container)
    const dataTable = new google.visualization.DataTable()

    dataTable.addColumn({ type: 'string', id: 'President' })
    dataTable.addColumn({ type: 'date', id: 'Start' })
    dataTable.addColumn({ type: 'date', id: 'End' })
    dataTable.addRows([
      ['Washington', new Date(1789, 3, 30), new Date(1797, 2, 4)],
      ['Adams', new Date(1797, 2, 4), new Date(1801, 2, 4)],
      ['Jefferson', new Date(1801, 2, 4), new Date(1809, 2, 4)]])

    chart.draw(dataTable)
    }
    google.charts.setOnLoadCallback(drawChart)
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
