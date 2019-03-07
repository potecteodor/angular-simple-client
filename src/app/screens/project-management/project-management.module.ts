import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AppSharedModule } from '../../modules/app-shared.module'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ProjectManagementComponent } from './project-management.component'
import { ProjectDetailComponent } from './project/project-detail/project-detail.component'
import { ProjectListComponent } from './project/project-list/project-list.component'
import { ProjectComponent } from './project/project.component'
import { ProjectService } from './project/project.service'
import { TaskComponent } from './task/task.component'

@NgModule({
  declarations: [
    ProjectComponent,
    TaskComponent,
    DashboardComponent,
    ProjectManagementComponent,
    ProjectListComponent,
    ProjectDetailComponent,
  ],
  imports: [
    AppSharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProjectManagementComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'projects', component: ProjectComponent },
          { path: 'tasks', component: TaskComponent },
        ],
      },
    ]),
  ],
  providers: [ProjectService],
})
export class ProjectManagementModule {}
