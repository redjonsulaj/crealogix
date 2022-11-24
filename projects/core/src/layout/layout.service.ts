import {Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Overlay} from "@angular/cdk/overlay";
import {map, shareReplay} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public layout: string | undefined;
  public orientation: string | undefined;

  constructor(public bo: BreakpointObserver, private overlay: Overlay, private http: HttpClient) {
  }

  get auMedia$() {
    const breakpoints = {
      '(orientation: portrait)': 'portrait', '(orientation: landscape)': 'landscape',
      [Breakpoints.Handset]: 'mobile', [Breakpoints.Tablet]: 'tablet', [Breakpoints.Web]: 'desktop'
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

  getRoutes() {
    this.getJSON().subscribe( response => {
      console.log(43, response);
      return response;
    })
  }

  public getJSON() {
    return this.http.get('assets/config.json');
  }
}
