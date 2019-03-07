import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AppSharedModule } from '../../modules/app-shared.module'
import { DashboardComponent } from './dashboard.component'
import { DashboardService } from './dashboard.service'

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    AppSharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
  ],
  providers: [DashboardService],
})
export class DashboardModule {}
