import {NgModule} from '@angular/core';
import {CoreComponent} from './core.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', loadChildren: () => import('../layout/layout.module').then(l => l.LayoutModule)}
];

@NgModule({
  declarations: [
    CoreComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    CoreComponent
  ]
})
export class CoreModule {
}
