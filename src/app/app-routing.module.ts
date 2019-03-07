import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './screens/dashboard/dashboard.component'
import { NotFoundComponent } from './screens/not-found/not-found.component'
import { ProjectManagementModule } from './screens/project-management/project-management.module'
import { DndSampleComponent } from './testarea/dnd-sample/dnd-sample.component'
import { FormExampleComponent } from './testarea/form-example/form-example.component'
import { PolicyListComponent } from './testarea/policy-list/policy-list.component'
import { TableSampleComponent } from './testarea/table-sample/table-sample.component'
import { TreeSampleComponent } from './testarea/tree-sample/tree-sample.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'project-management',
    loadChildren: () => ProjectManagementModule,
  },
  {
    path: 'testarea',
    children: [
      {
        path: 'form',
        component: FormExampleComponent,
      },
      {
        path: 'table',
        component: TableSampleComponent,
      },
      {
        path: 'tree',
        component: TreeSampleComponent,
      },
      {
        path: 'dnd',
        component: DndSampleComponent,
      },
      {
        path: 'crud',
        component: PolicyListComponent,
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
