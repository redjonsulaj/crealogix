import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LayoutService} from "../../layout.service";
import {EntityService} from "../../services/entity.service";

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
  constructor(public layoutService: LayoutService, private cd: ChangeDetectorRef, private entityService: EntityService) {
  }

  ngOnInit(): void {
    this.initSearch();
    this.initEntities();
  }

  private initSearch() {
    if (this.layoutService.config.hasOwnProperty('search')) {
      const entity =  this.layoutService.router.url.split('/')[1];
      this.search = {
        ...this.layoutService.config.search,
        ...(!this.entityService.getEntity() && {entity: this.layoutService.config.entities[entity]}),
        url: this.layoutService.config.entities[entity].url.slice(0, -1),
      };
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
