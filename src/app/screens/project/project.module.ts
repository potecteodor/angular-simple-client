import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AppSharedModule } from '../../modules/app-shared.module'
import { ProjectComponent } from './project.component'
import { ProjectService } from './project.service';
import { CreateProjectComponent } from './create-project/create-project.component'

@NgModule({
  declarations: [ProjectComponent, CreateProjectComponent],
  imports: [
    AppSharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProjectComponent,
      },
    ]),
  ],
  providers: [ProjectService],
})
export class ProjectModule {}
