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
import { ProjectService } from '../project/project.service'
import { CreateTaskComponent } from './create-task/create-task.component'
import { EditTaskComponent } from './edit-task/edit-task.component'
import { TaskDetailResolverService } from './task-detail/task-detail-resolver.service'
import { TaskDetailComponent } from './task-detail/task-detail.component'
import { TaskComponent } from './task.component'
import { TaskService } from './task.service'

@NgModule({
  declarations: [
    TaskComponent,
    CreateTaskComponent,
    EditTaskComponent,
    TaskDetailComponent,
  ],
  imports: [
    AppSharedModule,
    CommonPopupModule,
    MatChipsModule,
    MatExpansionModule,
    ProfilePopupModule,
    RouterModule.forChild([
      {
        path: '',
        component: TaskComponent,
      },
      {
        path: 'detail/:id',
        component: TaskDetailComponent,
        resolve: {
          data: TaskDetailResolverService,
        },
      },
    ]),
  ],
  providers: [
    TaskService,
    ProjectService,
    TaskDetailResolverService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  entryComponents: [CommonPopupComponent, CreateTaskComponent, ProfilePopupComponent],
})
export class TaskModule {}
