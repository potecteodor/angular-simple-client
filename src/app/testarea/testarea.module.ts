import { NgModule } from '@angular/core'
import { AppSharedModule } from '../modules/app-shared.module'
import { DndSampleComponent } from './dnd-sample/dnd-sample.component'
import { FormExampleComponent } from './form-example/form-example.component'
import { PolicyListComponent } from './policy-list/policy-list.component'
import { TableSampleComponent } from './table-sample/table-sample.component'
import { TreeSampleComponent } from './tree-sample/tree-sample.component'

@NgModule({
  declarations: [
    FormExampleComponent,
    TableSampleComponent,
    TreeSampleComponent,
    DndSampleComponent,
    PolicyListComponent,
  ],
  imports: [AppSharedModule],
  exports: [
    FormExampleComponent,
    TableSampleComponent,
    TreeSampleComponent,
    DndSampleComponent,
    PolicyListComponent,
  ],
})
export class TestareaModule {}
