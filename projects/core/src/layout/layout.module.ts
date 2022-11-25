import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './components/layout/layout.component';
import {MobileComponent} from './components/mobile/mobile.component';
import {DesktopComponent} from './components/desktop/desktop.component';
import {LayoutService} from "./layout.service";
import {RouterModule, Routes, ROUTES} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {NavbarComponent} from './components/navbar/navbar.component';
import {MaterialModule} from "../shared/material.module";
import { NavbarSearchComponent } from './components/navbar-search/navbar-search.component';

const children = [
  {path: '', component: LayoutComponent},
];

let routesDesktop: Routes = [{
  path: '', component: DesktopComponent, children: children
}];

let routesMobile: Routes = [{
  path: '', component: MobileComponent, children: children
}];


@NgModule({
  declarations: [LayoutComponent, MobileComponent, DesktopComponent, NavbarComponent, NavbarSearchComponent],
  imports: [CommonModule, RouterModule.forChild([]), HttpClientModule, MaterialModule],
  providers: [{provide: APP_INITIALIZER, multi: true, deps: [LayoutService], useFactory: app_init}, {
    provide: ROUTES,
    multi: true,
    deps: [LayoutService],
    useFactory: routes_init
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
