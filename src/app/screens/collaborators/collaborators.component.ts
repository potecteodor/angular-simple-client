import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator, MatSidenav, MatSort, MatTableDataSource } from '@angular/material'
import { CollaboratorsService } from './collaborators.service'

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss'],
})
export class CollaboratorsComponent implements OnInit {
  displayedColumns: string[] = ['email', 'display_name']
  dataSource: MatTableDataSource<any>

  @ViewChild('sidenav') sidenav: MatSidenav
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  collaborators = []
  constructor(private srv: CollaboratorsService) {}

  ngOnInit() {
    this.loadColabs()
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
