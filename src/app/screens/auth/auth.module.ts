import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgxMaskModule } from 'ngx-mask'
import { CommonPopupComponent } from '../../common-popup/common-popup.component'
import { CommonPopupModule } from '../../common-popup/common-popup.module'
import { AppSharedModule } from '../../modules/app-shared.module'
import { AccActivationComponent } from './acc-activation/acc-activation.component'
import { AccActivationService } from './acc-activation/acc-activation.service'
import { AuthService } from './auth.service'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { ResetPasswordService } from './reset-password/reset-password.service'

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AccActivationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  providers: [AuthService, AccActivationService, ResetPasswordService],
  imports: [
    AppSharedModule,
    CommonPopupModule,
    NgxMaskModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'reset-password/:key',
        component: ResetPasswordComponent,
        resolve: {
          data: ResetPasswordService,
        },
      },
      {
        path: 'activate/:key',
        component: AccActivationComponent,
        resolve: {
          isActive: AccActivationService,
        },
      },
    ]),
  ],
  entryComponents: [CommonPopupComponent],
})
export class AuthModule {}
