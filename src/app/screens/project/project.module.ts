import { NgModule } from '@angular/core'
import {
  MatChipsModule,
  MatDialogRef,
  MatExpansionModule,
  MAT_DIALOG_DATA,
} from '@angular/material'
import { RouterModule } from '@angular/router'
import { CommonPopupComponent } from '../../common-popup/common-popup.component'
import { CommonPopupModule } from '../../common-popup/common-popup.module'
import { AppSharedModule } from '../../modules/app-shared.module'
import { ProfilePopupComponent } from '../../profile-popup/profile-popup.component'
import { ProfilePopupModule } from '../../profile-popup/profile-popup.module'
import { CollaboratorsService } from '../collaborators/collaborators.service'
import { TaskService } from '../task/task.service'
import { CreateProjectComponent } from './create-project/create-project.component'
import { CreateTaskInProjectComponent } from './create-task-in-project/create-task-in-project.component'
import { EditProjectComponent } from './edit-project/edit-project.component'
import { ProjectDetailResolverService } from './project-detail/project-detail-resolver.service'
import { ProjectDetailComponent } from './project-detail/project-detail.component'
import { ProjectComponent } from './project.component'
import { ProjectService } from './project.service'
import { TaskDetailInProjectComponent } from './task-detail-in-project/task-detail-in-project.component'

@NgModule({
  declarations: [
    ProjectComponent,
    CreateProjectComponent,
    EditProjectComponent,
    ProjectDetailComponent,
    TaskDetailInProjectComponent,
    CreateTaskInProjectComponent,
  ],
  imports: [
    AppSharedModule,
    CommonPopupModule,
    ProfilePopupModule,
    MatExpansionModule,
    MatChipsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProjectComponent,
      },
      {
        path: 'detail/:id',
        component: ProjectDetailComponent,
        resolve: {
          data: ProjectDetailResolverService,
        },
      },
    ]),
  ],
  entryComponents: [
    CommonPopupComponent,
    ProfilePopupComponent,
    CreateTaskInProjectComponent,
    TaskDetailInProjectComponent,
  ],
  providers: [
    ProjectService,
    CollaboratorsService,
    ProjectDetailResolverService,
    TaskService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
})
export class ProjectModule {}
