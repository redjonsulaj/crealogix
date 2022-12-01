import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {LayoutService} from "../../layout.service";
import {EntityService} from "../../services/entity.service";
import {Event as NavigationEvent, NavigationEnd} from '@angular/router';
import {Subscription} from "rxjs";

@Component({
  selector: 'lib-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesktopComponent implements OnInit, OnDestroy {
  search: any = {
    active: false,
    config: {}
  };
  entities: any = {
    active: false,
  };
  subscriptions: Subscription[] = [];

  constructor(public layoutService: LayoutService, private cd: ChangeDetectorRef, private entityService: EntityService) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  ngOnInit(): void {
    this.initSearch();
    this.initEntities();
    this.subscriptions.push(
      this.layoutService.router.events.subscribe(
        (event: NavigationEvent) => {
          if (event instanceof NavigationEnd) {
            this.initSearch();
            this.initEntities();
          }
        })
    )
  }

  private initSearch() {
    if (this.layoutService.config.hasOwnProperty('search')) {
      let entity = this.layoutService.router.url.split('/')[1];
      if (entity === '') {
        this.layoutService.router.navigateByUrl('/people')
      } else {
        this.search = {
          ...this.layoutService.config.search,
          ...(!this.entityService.getEntity() && {entity: this.layoutService.config.entities[entity]}),
          url: this.layoutService.config.entities[entity].url.slice(0, -1),
        };
        this.cd.markForCheck();
      }

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
