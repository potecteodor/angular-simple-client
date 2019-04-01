import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../../modules/app-shared.module';
import { TaskComponent } from './task.component';

@NgModule({
  declarations: [TaskComponent],
  imports: [
    AppSharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TaskComponent,
      },
    ]),
  ]
})
export class TaskModule { }
