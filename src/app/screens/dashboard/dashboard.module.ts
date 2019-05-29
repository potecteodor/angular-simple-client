import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AppSharedModule } from '../../modules/app-shared.module'
import { CollaboratorsService } from '../collaborators/collaborators.service'
import { ProjectService } from '../project/project.service'
import { TaskService } from '../task/task.service'
import { DashboardComponent } from './dashboard.component'
import { DashboardService } from './dashboard.service'

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    AppSharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
  ],
  providers: [DashboardService, CollaboratorsService, ProjectService, TaskService],
})
export class DashboardModule {}
