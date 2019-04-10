import { Component, OnInit, ViewChild } from '@angular/core'
import {
  MatDialog,
  MatPaginator,
  MatSidenav,
  MatSnackBar,
  MatSort,
  MatTableDataSource,
} from '@angular/material'
import { CommonPopupComponent } from '../../common-popup/common-popup.component'
import { CollaboratorsService } from './collaborators.service'

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss'],
})
export class CollaboratorsComponent implements OnInit {
  displayedColumns: string[] = ['email', 'display_name', 'actions']
  dataSource: MatTableDataSource<any>

  @ViewChild('sidenav') sidenav: MatSidenav
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  collaborators = []
  constructor(
    private srv: CollaboratorsService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadColabs()
  }

  deleteCollab(row) {
    const dialogRef = this.dialog.open(CommonPopupComponent, {
      width: '400px',
      disableClose: true,
      data: {
        title: 'Warning!',
        message: `Are you sure you want to remove this collaborator?`,
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
        this.srv.delete(row.collab_id).subscribe(d => {
          if (d) {
            this.loadColabs()
            this.snackBar.open('Collaborator Removed!', '', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            })
          }
        })
      }
    })
  }

  loadColabs() {
    this.srv.getAll().subscribe(d => {
      this.dataSource = new MatTableDataSource(d)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
      this.collaborators = d
    })
  }

  eventListener(ev) {
    if (ev === 'close') {
      this.sidenav.close()
    }
    if (ev === 'add') {
      this.loadColabs()
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
}
