import { NgModule } from '@angular/core'
import { AppSharedModule } from '../../../modules/app-shared.module'
import { AuthService } from '../auth.service'
import { ChangePassComponent } from './change-pass.component'

@NgModule({
  declarations: [ChangePassComponent],
  imports: [AppSharedModule],
  exports: [ChangePassComponent],
  providers: [AuthService],
})
export class ChangePassModule {}
