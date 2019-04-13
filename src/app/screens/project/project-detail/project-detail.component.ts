import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  project = null
  members = []
  projectOwner = null
  tasks = null

  constructor(private ars: ActivatedRoute, private router: Router) {
    ars.data.subscribe(d => {
      this.project = d.data.project
      this.members = d.data.members
      this.projectOwner = d.data.projectOwner
      this.tasks = d.data.tasks
    })
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/project'])
  }
}
