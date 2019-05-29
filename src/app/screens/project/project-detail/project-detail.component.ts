import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from '../../../core/services/user.service'
import { ProfilePopupComponent } from '../../../profile-popup/profile-popup.component'

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

  constructor(
    private ars: ActivatedRoute,
    private router: Router,
    private userSrv: UserService,
    public dialog: MatDialog
  ) {
    ars.data.subscribe(d => {
      this.project = d.data.project
      this.members = d.data.members
      this.projectOwner = d.data.projectOwner
      this.tasks = d.data.tasks
    })
  }

  ngOnInit() {}

  openProfile(item) {
    this.userSrv.getOne(item.id).subscribe(d => {
      this.dialog.open(ProfilePopupComponent, {
        width: '400px',
        disableClose: true,
        data: d[0],
      })
    })
  }

  goBack() {
    this.router.navigate(['/project'])
  }
}
