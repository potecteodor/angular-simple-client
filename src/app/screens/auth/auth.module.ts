import { NgModule } from '@angular/core';
import { AppSharedModule } from '../../modules/app-shared.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    AppSharedModule
  ]
})
export class AuthModule { }
