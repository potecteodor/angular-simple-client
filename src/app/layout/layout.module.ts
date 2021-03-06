import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatBadgeModule, MatExpansionModule } from '@angular/material'
import { RouterModule } from '@angular/router'
import { AppSharedModule } from '../modules/app-shared.module'
import { MyProfileComponent } from '../my-profile/my-profile.component'
import { MyProfileModule } from '../my-profile/my-profile.module'
import { LeftNavigationComponent } from '../navigation/left-navigation/left-navigation.component'
import { TopNavigationComponent } from '../navigation/top-navigation/top-navigation.component'
import { NotificationsComponent } from '../notifications/notifications.component'
import { ChangePassComponent } from '../screens/auth/change-pass/change-pass.component'
import { ChangePassModule } from '../screens/auth/change-pass/change-pass.module'
import { AppLayoutComponent } from './app-layout/app-layout.component'
import { AuthLayoutComponent } from './auth-layout/auth-layout.component'

@NgModule({
  declarations: [
    AppLayoutComponent,
    AuthLayoutComponent,
    TopNavigationComponent,
    LeftNavigationComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    RouterModule,
    ChangePassModule,
    MyProfileModule,
    MatExpansionModule,
    MatBadgeModule,
  ],
  entryComponents: [ChangePassComponent, MyProfileComponent],
  exports: [AppLayoutComponent, AuthLayoutComponent],
})
export class LayoutModule {}
