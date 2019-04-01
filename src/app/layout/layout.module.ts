import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../modules/app-shared.module';
import { LeftNavigationComponent } from '../navigation/left-navigation/left-navigation.component';
import { TopNavigationComponent } from '../navigation/top-navigation/top-navigation.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

@NgModule({
  declarations: [AppLayoutComponent, AuthLayoutComponent, TopNavigationComponent,
    LeftNavigationComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    RouterModule,
  ],
  exports: [AppLayoutComponent, AuthLayoutComponent]
})
export class LayoutModule { }
