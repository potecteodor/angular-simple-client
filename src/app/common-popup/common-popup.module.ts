import { NgModule } from '@angular/core'
import { AppSharedModule } from '../modules/app-shared.module'
import { CommonPopupComponent } from './common-popup.component'

@NgModule({
  declarations: [CommonPopupComponent],
  imports: [AppSharedModule],
  exports: [CommonPopupComponent],
})
export class CommonPopupModule {}
