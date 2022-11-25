import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LayoutService} from "../../layout.service";

@Component({
  selector: 'lib-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesktopComponent implements OnInit {
  search: any = {
    active: false,
    config: {}
  };
  entities: any = {
    active: false,
  };
  constructor(public layoutService: LayoutService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.initSearch();
    this.initEntities();
  }

  private initSearch() {
    if (this.layoutService.config.hasOwnProperty('search')) {
      this.search = {...this.layoutService.config.search};
      this.cd.markForCheck();
    }
  }

  private initEntities() {
    if (this.layoutService.config.hasOwnProperty('entities')) {
      this.entities = {active: true, config: {...this.layoutService.config.entities}};
      this.cd.markForCheck();
      // Object.assign(this.entities || {}, {active: true, ...this.layoutService.config.entities})
      // this.entities = {active: true, ...this.layoutService.config.entities};
    }
  }

}
