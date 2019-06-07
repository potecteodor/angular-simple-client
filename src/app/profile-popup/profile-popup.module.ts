import { NgModule } from '@angular/core'
import { NgxMaskModule } from 'ngx-mask'
import { AppSharedModule } from '../modules/app-shared.module'
import { ProfilePopupComponent } from './profile-popup.component'

@NgModule({
  declarations: [ProfilePopupComponent],
  imports: [AppSharedModule, NgxMaskModule.forRoot()],
  exports: [ProfilePopupComponent],
})
export class ProfilePopupModule {}
