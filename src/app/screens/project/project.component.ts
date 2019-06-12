import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core'
import {
  MatDialog,
  MatPaginator,
  MatSidenav,
  MatSnackBar,
  MatSort,
  MatTableDataSource,
} from '@angular/material'
import { Router } from '@angular/router'
import { CommonPopupComponent } from '../../common-popup/common-popup.component'
import { CryptService } from '../../core/services/crypt.service'
import { CreateTaskInProjectComponent } from './create-task-in-project/create-task-in-project.component'
import { ProjectService } from './project.service'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectComponent implements OnInit {
  isEditable = false
  displayedColumns: string[] = [
    'name',
    'start_date',
    'end_date',
    'description',
    'actions',
  ]
  dataSource: MatTableDataSource<any>

  @ViewChild('sidenav') sidenav: MatSidenav
  @ViewChild('editSidenav') editSidenav: MatSidenav

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  selectedProject = null
  allProjects = []
  myProjects = []
  otherProjects = []
  filterMenuText = 'All Projects'
  userID

  constructor(
    private srv: ProjectService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit() {
    this.userID = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    this.getProjects()
  }

  onProjectClick(project) {
    /*  const pID = CryptService.crypt({ id: project.id })
    this.router.navigate(['/project/detail/' + pID]) */
    this.selectedProject = project
    this.isEditable = false
    this.editSidenav.open()
  }

  filter(filter) {
    if (filter === 'all') {
      this.filterMenuText = 'All Projects'
      this.dataSource = new MatTableDataSource(this.allProjects)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    }
    if (filter === 'my') {
      this.filterMenuText = 'My Projects'
      this.dataSource = new MatTableDataSource(this.myProjects)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    }
    if (filter === 'other') {
      this.filterMenuText = 'Other Projects'
      this.dataSource = new MatTableDataSource(this.otherProjects)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    }
  }

  onOtherProjectClick(project) {
    /* const pID = CryptService.crypt({ id: project.project_id })
    this.router.navigate(['/project/detail/' + pID]) */
    this.selectedProject = project
    this.isEditable = false
    this.editSidenav.open()
  }

  getProjects() {
    const id = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    this.srv.getMyProjects(id).subscribe(d => {
      this.myProjects = d
      this.allProjects = d
      this.srv.getOtherProjects(id).subscribe(otherP => {
        this.otherProjects = otherP
        otherP.map(el => {
          this.allProjects.push(el)
        })
        this.dataSource = new MatTableDataSource(this.allProjects)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      })
    })
  }
  onCreateProject() {}

  addTask(project) {
    const dialogRef = this.dialog.open(CreateTaskInProjectComponent, {
      data: project,
      panelClass: 'addTaskDialogClass',
    })
  }

  onEdit(project) {
    this.selectedProject = project
    this.isEditable = true
    this.editSidenav.open()
  }
  onDelete(project) {
    const dialogRef = this.dialog.open(CommonPopupComponent, {
      width: '400px',
      disableClose: true,
      data: {
        title: 'Warning!',
        message: `Are you sure you want to remove this project?`,
        buttons: [
          {
            type: 'ok',
            text: 'Yes!',
          },
          {
            type: 'no',
            text: 'No!',
          },
        ],
      },
    })
    dialogRef.afterClosed().subscribe((action: any) => {
      if (action === 'ok') {
        this.srv.deleteProject(project.id).subscribe(d => {
          if (d) {
            this.getProjects()
            this.snackBar.open('Project Removed!', '', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            })
          }
        })
      }
    })
  }

  eventListener(ev) {
    if (ev === 'close') {
      this.sidenav.close()
      this.editSidenav.close()
    }
    if (ev === 'add') {
      this.sidenav.close()
      this.getProjects()
    }
    if (ev === 'edit') {
      this.editSidenav.close()
      this.selectedProject = null
      this.getProjects()
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
}
