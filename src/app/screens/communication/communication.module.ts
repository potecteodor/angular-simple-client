import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AppSharedModule } from '../../modules/app-shared.module'
import { ProfilePopupComponent } from '../../profile-popup/profile-popup.component'
import { ProfilePopupModule } from '../../profile-popup/profile-popup.module'
import { CommunicationComponent } from './communication.component'
import { CommunicationService } from './communication.service'

@NgModule({
  declarations: [CommunicationComponent],
  imports: [
    AppSharedModule,
    ProfilePopupModule,
    RouterModule.forChild([
      {
        path: '',
        component: CommunicationComponent,
      },
    ]),
  ],
  providers: [CommunicationService],
  entryComponents: [ProfilePopupComponent],
})
export class CommunicationModule {}
