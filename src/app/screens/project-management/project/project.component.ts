import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component, OnInit, ViewChild } from '@angular/core'
import { MatSidenav } from '@angular/material'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Project } from './project.model'
import { ProjectService } from './project.service'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches))

  selectedRow: Project

  @ViewChild('drawer')
  drawer: MatSidenav

  constructor(
    private breakpointObserver: BreakpointObserver,
    private ps: ProjectService
  ) {}

  ngOnInit() {}

  listActions(ev) {
    if (ev.type === 'selection') {
      this.ps.getProject(ev.data).subscribe(project => {
        this.selectedRow = project
      })
      this.drawer.open()
    }
  }
}
