import {NgModule} from '@angular/core';
import {CoreComponent} from './core.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', loadChildren: () => import('../layout/layout.module').then(l => l.LayoutModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    CoreComponent
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    CoreComponent
  ]
})
export class CoreModule {
}
