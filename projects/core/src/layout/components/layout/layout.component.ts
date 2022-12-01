import {ChangeDetectorRef, Component, OnInit, TrackByFunction} from '@angular/core';
import {LayoutService} from "../../layout.service";
import {distinctUntilChanged, Observable, of} from "rxjs";
import {EntityService} from "../../services/entity.service";

@Component({
  selector: 'lib-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  entity: any = {};
  list$: Observable<any> = new Observable<any>();

  constructor(private l: LayoutService, public entityService: EntityService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.validateUrl();
    this.entityService.entityChange$
      .pipe(distinctUntilChanged())
      .subscribe(value => {
        if (value) {
          let items = this.entityService.getItem();
          if (this.entity.hasOwnProperty('secondUrl')) {
            items = this.entityService.mapResponseResults(items, this.entity['secondUrl']);
          }
          this.list$ = of(items);
          this.cd.markForCheck();
          this.entityService.entityChange$.next(false);

        }
      });
  }

  private validateUrl() {
    if (this.l.router.url === '/') {
      return;
    }
    const url = this.l.router.url.split('/')[1];
    this.entity = this.l.config['entities'][url];
    this.entityService.setEntity(this.entity);
    if (this.entity.hasOwnProperty('view')) {
      this.generateView();
    } else {
      this.generateInProgress();
    }
  }

  private generateView(url?: string) {
    if (this.entity.hasOwnProperty('secondUrl')) {
      const mapper = this.entity['attributes'][this.entity['secondUrl']]['mapper']
      this.list$ = this.entityService.getEntityUrlAndMerge(url || this.entity.url, this.entity['secondUrl'], mapper);
    } else {
      this.list$ = this.entityService.getEntityUrl(url || this.entity.url);
    }
  }

  private generateInProgress() {

  }

  public trackIndex: TrackByFunction<any[]> = (index) => index;

  paginate(direction: string) {
    if (direction === 'previous' && !!this.entityService.pagination.previous) {
      this.generateView(this.entityService.pagination.previous)
    } else if (direction === 'next' && !!this.entityService.pagination.next) {
      this.generateView(this.entityService.pagination.next)
    }
  }

  redirect(item: any) {
    const entity = this.l.router.url.split('/')[1];
    const url = item.url.split(entity)[1].replace(/.$/, '');
    this.entityService.setItem(item);
    this.entityService.setEntity(this.entity);
    this.l.router.navigateByUrl(`${entity}${url}`, {...item});
  }
}
