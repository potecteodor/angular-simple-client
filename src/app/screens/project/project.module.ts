import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../../modules/app-shared.module';
import { ProjectComponent } from './project.component';

@NgModule({
  declarations: [ProjectComponent],
  imports: [
    AppSharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProjectComponent,
      },
    ]),
  ]
})
export class ProjectModule { }
