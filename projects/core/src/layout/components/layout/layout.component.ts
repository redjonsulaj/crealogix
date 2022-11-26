import {AfterViewInit, Component, OnInit, TrackByFunction} from '@angular/core';
import {LayoutService} from "../../layout.service";
import {Observable, tap} from "rxjs";
import {EntityService} from "../../services/entity.service";

@Component({
  selector: 'lib-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  entity: any = {};
  list$: Observable<any> = new Observable<any>();

  constructor(private l: LayoutService, private entityService: EntityService) { }

  ngOnInit(): void {
    this.validateUrl()
  }

  ngAfterViewInit() {
  }

  private validateUrl() {
    if (this.l.router.url === '/') {
      return;
    }
    const url = this.l.router.url.split('/')[1];
    this.entity = this.l.config['entities'][url];
    if (this.entity.hasOwnProperty('view')) {
      this.generateView();
    } else {
      this.generateInProgress();
    }
  }

  private generateView() {
    if(this.entity.hasOwnProperty('secondUrl')) {
      const mapper = this.entity['attributes'][this.entity['secondUrl']]['mapper']
      this.list$ = this.entityService.getEntityAndMerge(this.entity.url, this.entity['secondUrl'], mapper);
    } else {
      this.list$ = this.entityService.getEntity(this.entity.url);
    }
  }

  private generateInProgress() {

  }

  public trackIndex: TrackByFunction<any[]> = (index) => index;

}
