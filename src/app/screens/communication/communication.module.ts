import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AppSharedModule } from '../../modules/app-shared.module'
import { CommunicationComponent } from './communication.component'
import { CommunicationService } from './communication.service'

@NgModule({
  declarations: [CommunicationComponent],
  imports: [
    AppSharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: CommunicationComponent,
      },
    ]),
  ],
  providers: [CommunicationService],
})
export class CommunicationModule {}
