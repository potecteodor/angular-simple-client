import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonPopupComponent } from '../../common-popup/common-popup.component'
import { CommonPopupModule } from '../../common-popup/common-popup.module'
import { AppSharedModule } from '../../modules/app-shared.module'
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
  providers: [TaskService, ProjectService, TaskDetailResolverService],
  entryComponents: [CommonPopupComponent],
})
export class TaskModule {}
