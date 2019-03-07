import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Project } from '../project.model'
import { ProjectService } from '../project.service'

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  projects: Project[]

  @Output()
  sendAction = new EventEmitter()

  constructor(private ps: ProjectService) {}

  ngOnInit() {
    this.ps.getProjects().subscribe(data => {
      this.projects = data.map(e => {
        return { id: e.payload.doc.id, ...e.payload.doc.data() } as Project
      })
    })
  }

  loadDetail(id) {
    this.sendAction.emit({ type: 'selection', data: id })
  }
}
