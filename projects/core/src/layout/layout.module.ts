import {NgModule, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './components/layout/layout.component';
import {MobileComponent} from './components/mobile/mobile.component';
import {DesktopComponent} from './components/desktop/desktop.component';
import {LayoutService} from "./layout.service";
import {Router, RouterModule, Routes, ROUTES} from "@angular/router";
import {debounceTime, skip, Subscription} from "rxjs";
import {HttpClientModule} from "@angular/common/http";

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
  declarations: [LayoutComponent, MobileComponent, DesktopComponent],
  imports: [CommonModule, RouterModule.forChild([]), HttpClientModule],
  providers: [
    {provide: ROUTES, multi: true, deps: [LayoutService], useFactory: routes_init}
  ]
})
export class LayoutModule implements OnDestroy {
  subscription: Subscription = new Subscription();

  constructor(private router: Router, private layoutService: LayoutService) {
    if (window.location.pathname.indexOf('auth') === -1) {
      this.subscription = this.layoutService.auMedia$.pipe(skip(1), debounceTime(1000)).subscribe(media => {
        if (media.layout === 'mobile') {
          router.resetConfig(routesMobile);
          router.navigateByUrl(window.location.pathname === '/' ? '/dashboard' : window.location.pathname).then(r => r);
        } else {
          router.resetConfig(routesDesktop);
          router.navigateByUrl(window.location.pathname === '/' ? '/dashboard' : window.location.pathname).then(r => r);
        }
        console.warn('Layout Change: ', media);
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

export function routes_init(is: LayoutService) {
  const rd = is.getRoutes() || [];
  routesDesktop[0] = {...routesDesktop[0], children: [...rd]};
  routesMobile[0] = {...routesMobile[0], children: [...rd]};
  return window.innerWidth > 600 ? routesDesktop : routesMobile;
}
