import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AuthModule } from './screens/auth/auth.module';
import { DashboardModule } from './screens/dashboard/dashboard.module';
import { NotFoundComponent } from './screens/not-found/not-found.component';
import { ProjectModule } from './screens/project/project.module';
import { TaskModule } from './screens/task/task.module';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => DashboardModule,
      },
      {
        path: 'task',
        loadChildren: () => TaskModule,
      },
      {
        path: 'project',
        loadChildren: () => ProjectModule,
      },
      /*{
        path: 'task',
        loadChildren: () => TaskModule,
      }, */
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => AuthModule,
      }]
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
