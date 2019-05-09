import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './guards/auth.guard'
import { AppLayoutComponent } from './layout/app-layout/app-layout.component'
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component'
import { AuthModule } from './screens/auth/auth.module'
import { CollaboratorsModule } from './screens/collaborators/collaborators.module'
import { CommunicationModule } from './screens/communication/communication.module'
import { DashboardModule } from './screens/dashboard/dashboard.module'
import { NotFoundComponent } from './screens/not-found/not-found.component'
import { ProjectModule } from './screens/project/project.module'
import { TaskModule } from './screens/task/task.module'

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => DashboardModule,
      },
      {
        path: 'collaborators',
        canActivate: [AuthGuard],
        loadChildren: () => CollaboratorsModule,
      },
      {
        path: 'communication',
        canActivate: [AuthGuard],
        loadChildren: () => CommunicationModule,
      },
      {
        path: 'task',
        canActivate: [AuthGuard],
        loadChildren: () => TaskModule,
      },
      {
        path: 'project',
        canActivate: [AuthGuard],
        loadChildren: () => ProjectModule,
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => AuthModule,
      },
    ],
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
export class AppRoutingModule {}
