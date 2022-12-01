import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './components/layout/layout.component';
import {MobileComponent} from './components/mobile/mobile.component';
import {DesktopComponent} from './components/desktop/desktop.component';
import {LayoutService} from "./layout.service";
import {RouterModule, Routes, ROUTES} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {NavbarComponent} from './components/navbar/navbar.component';
import {NavbarSearchComponent} from './components/navbar-search/navbar-search.component';
import {ItemComponent} from './components/item/item.component';
import {SharedModule} from "../shared/shared.module";
import {ItemDetailComponent} from './components/item-detail/item-detail.component';
import {ReactiveFormsModule} from "@angular/forms";

const children = [{path: '', component: LayoutComponent},];

let routesDesktop: Routes = [{
  path: '', component: DesktopComponent, children: children
}];

let routesMobile: Routes = [{
  path: '', component: MobileComponent, children: children
}];


@NgModule({
  declarations: [LayoutComponent, MobileComponent, DesktopComponent, NavbarComponent, NavbarSearchComponent, ItemComponent, ItemDetailComponent],
  imports: [CommonModule, RouterModule.forChild([]), HttpClientModule, SharedModule, ReactiveFormsModule],
  providers: [{provide: APP_INITIALIZER, multi: true, deps: [LayoutService], useFactory: app_init}, {
    provide: ROUTES, multi: true, deps: [LayoutService], useFactory: routes_init
  }]
})

export class LayoutModule {
}

export function app_init(ls: LayoutService) {
  return () => ls.getJSON().then(response => response);
}

export function routes_init(ls: LayoutService) {
  ls.getJSON();
  return window.innerWidth > 600 ? routesDesktop : routesMobile;
}
