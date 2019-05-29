import { NgModule } from '@angular/core'
import { AppSharedModule } from '../modules/app-shared.module'
import { ProfilePopupComponent } from './profile-popup.component'

@NgModule({
  declarations: [ProfilePopupComponent],
  imports: [AppSharedModule],
  exports: [ProfilePopupComponent],
})
export class ProfilePopupModule {}
