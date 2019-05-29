import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {
  task = null
  members = []
  project = null

  constructor(private ars: ActivatedRoute, private router: Router) {
    ars.data.subscribe(d => {
      this.task = d.data.task
      this.members = d.data.members
      this.project = d.data.project
    })
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/task'])
  }
}
