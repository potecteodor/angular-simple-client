import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonPopupComponent } from '../../common-popup/common-popup.component'
import { CommonPopupModule } from '../../common-popup/common-popup.module'
import { AppSharedModule } from '../../modules/app-shared.module'
import { CollaboratorsService } from '../collaborators/collaborators.service'
import { CreateProjectComponent } from './create-project/create-project.component'
import { EditProjectComponent } from './edit-project/edit-project.component'
import { ProjectDetailResolverService } from './project-detail/project-detail-resolver.service'
import { ProjectDetailComponent } from './project-detail/project-detail.component'
import { ProjectComponent } from './project.component'
import { ProjectService } from './project.service'

@NgModule({
  declarations: [
    ProjectComponent,
    CreateProjectComponent,
    EditProjectComponent,
    ProjectDetailComponent,
  ],
  imports: [
    AppSharedModule,
    CommonPopupModule,
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
  entryComponents: [CommonPopupComponent],
  providers: [ProjectService, CollaboratorsService, ProjectDetailResolverService],
})
export class ProjectModule {}
