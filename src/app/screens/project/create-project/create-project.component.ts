import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { IProject } from '../../../core/interfaces/project.interface'

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  @Output()
  eventOutput = new EventEmitter()

  project: IProject

  constructor() {}

  ngOnInit() {
    this.initProject()
  }

  initProject() {
    this.project = {
      name: '',
      start_date: null,
      end_date: null,
      description: '',
    }
  }

  onClose() {
    this.eventOutput.emit('close')
  }

  onAdd() {}
}
