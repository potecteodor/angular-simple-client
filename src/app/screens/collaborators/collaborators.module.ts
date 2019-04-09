import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonPopupComponent } from '../../common-popup/common-popup.component'
import { CommonPopupModule } from '../../common-popup/common-popup.module'
import { AppSharedModule } from '../../modules/app-shared.module'
import { AddCollaboratorComponent } from './add-collaborator/add-collaborator.component'
import { CollaboratorsComponent } from './collaborators.component'
import { CollaboratorsService } from './collaborators.service'

@NgModule({
  declarations: [CollaboratorsComponent, AddCollaboratorComponent],
  imports: [
    AppSharedModule,
    CommonPopupModule,
    RouterModule.forChild([
      {
        path: '',
        component: CollaboratorsComponent,
      },
    ]),
  ],
  entryComponents: [CommonPopupComponent],
  providers: [CollaboratorsService],
})
export class CollaboratorsModule {}
