import { Component, Input, OnChanges } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ProjectService } from '../project.service'

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnChanges {
  @Input()
  selectedItem

  state = 'view'

  projectForm = this.fb.group({
    projectName: [null, Validators.required],
    responsible: null, // [null, Validators.required],
    startDate: null, // [null, Validators.required],
    finishDate: null,
    notes: null, // [null, Validators.required],
  })

  constructor(private fb: FormBuilder, private ps: ProjectService) {}

  ngOnChanges() {
    console.log(this.selectedItem)
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.ps.createProject(this.projectForm.getRawValue())
    }
  }
}
