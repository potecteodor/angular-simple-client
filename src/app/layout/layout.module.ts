import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../modules/app-shared.module';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

@NgModule({
  declarations: [AppLayoutComponent, AuthLayoutComponent],
  imports: [
    AppSharedModule,
    RouterModule,
  ],
  exports: [AppLayoutComponent, AuthLayoutComponent]
})
export class LayoutModule { }
