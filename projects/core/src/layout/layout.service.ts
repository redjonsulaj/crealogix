import {Injectable, Injector} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Overlay} from "@angular/cdk/overlay";
import {lastValueFrom, map, shareReplay} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LayoutComponent} from "./components/layout/layout.component";
import {Router, Routes} from "@angular/router";
import {DesktopComponent} from "./components/desktop/desktop.component";
import {MobileComponent} from "./components/mobile/mobile.component";

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public layout: string | undefined;
  public orientation: string | undefined;

  constructor(public bo: BreakpointObserver, private overlay: Overlay, private http: HttpClient, private injector: Injector) {
  }

  get router(): Router {
    return this.injector.get(Router);
  }

  get media$() {
    const breakpoints = {
      '(orientation: portrait)': 'portrait',
      '(orientation: landscape)': 'landscape',
      [Breakpoints.Handset]: 'mobile',
      [Breakpoints.Tablet]: 'tablet',
      [Breakpoints.Web]: 'desktop'
    };
    return this.bo.observe(Object.keys(breakpoints)).pipe(map((x: any) => {
      if (x.matches) {
        for (const media in breakpoints) {
          if (breakpoints.hasOwnProperty(media)) {
            const keys = media.indexOf(',') !== -1 ? media.split(', ') : [media];
            keys.forEach(m => {
              if (x.breakpoints[m] && ['portrait', 'landscape'].indexOf(breakpoints[media]) > -1) {
                this.orientation = breakpoints[media];
              } else if (x.breakpoints[m]) {
                this.layout = breakpoints[media];
              }
            });
          }
        }
      }
      return {layout: this.layout, orientation: this.orientation};
    }), shareReplay(1));
  }

  public getJSON() {
    const config$ = this.http.get('assets/config.json').pipe(map(response => {
      const children = [{path: 'home', component: LayoutComponent}, {
        path: 'dashboard',
        component: LayoutComponent
      }, {path: '**', redirectTo: 'home'}];

      let routesDesktop: Routes = [{
        path: '', component: DesktopComponent, children: children
      }];

      let routesMobile: Routes = [{
        path: '', component: MobileComponent, children: children
      }];
      const router = this.injector.get(Router);
      router.config = [...window.innerWidth > 600 ? routesDesktop : routesMobile];
      router.navigateByUrl('');
      return response;
    }))
    return lastValueFrom(config$);
  }

  updateRoutes(routes: any, test: any) {
    routes.map((route: any) => {
      if (route.children) {
        route.children = [...route.children, ...test];
        return;
      } else if (route.hasOwnProperty('_loadedRoutes')) {
        console.log(74, route)
        this.updateRoutes(route['_loadedRoutes'], test);
      }
    });
  }
}
