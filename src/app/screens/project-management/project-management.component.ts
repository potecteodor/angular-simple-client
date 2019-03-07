import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss'],
})
export class ProjectManagementComponent implements OnInit {
  navLinks = [
    {
      path: 'dashboard',
      label: 'Dashboard',
    },
    {
      path: 'projects',
      label: 'Projects',
    },
    {
      path: 'tasks',
      label: 'Tasks',
    },
  ]
  constructor() {}

  ngOnInit() {}
}
