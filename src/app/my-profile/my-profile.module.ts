import { NgModule } from '@angular/core'
import { MatFileUploadModule } from 'angular-material-fileupload'
import { NgxMaskModule } from 'ngx-mask'
import { AppSharedModule } from '../modules/app-shared.module'
import { MyProfileComponent } from './my-profile.component'

@NgModule({
  declarations: [MyProfileComponent],
  imports: [AppSharedModule, MatFileUploadModule, NgxMaskModule.forRoot()],
  exports: [MyProfileComponent],
})
export class MyProfileModule {}
