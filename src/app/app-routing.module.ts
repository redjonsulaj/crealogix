import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('projects/core/src/lib/core.module').then(c => c.CoreModule)
},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: !(!!(window.history && window.history.pushState)),
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload'
  })], exports: [RouterModule]
})
export class AppRoutingModule {
}
