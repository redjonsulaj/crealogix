import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'lib-navbar, [lib-navbar]',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit{
  @Input('entities') entities: any;
  navLinks: Array<any> = []

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.initNavLinks();
  }

  private initNavLinks() {
    if (this.entities && this.entities.active) {
      Object.keys(this.entities.config).map((key,index) => {
        this.navLinks.push({url: this.entities.config[key]['url'], label: key, path: key})
      });
    }
  }

  redirectTo(link: any) {
    localStorage.setItem('url', link.path);
    this.router.navigateByUrl('').then( r => this.router.navigateByUrl(`/${link.path}`));
  }
}
