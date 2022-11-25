import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LayoutService} from "../../layout.service";
import {Observable} from "rxjs";
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
    console.log(this.l.config, this.l.router.url, window.location.pathname);
  }

  ngAfterViewInit() {
  }

  private validateUrl() {
    if (this.l.router.url === '/') {
      return;
    }
    const url = this.l.router.url.split('/')[1];
    this.entity = this.l.config['entities'][url];
    console.log(31, this.entity);
    if (this.entity.hasOwnProperty('view')) {
      this.generateView();
    } else {
      this.generateInProgress();
    }
  }

  private generateView() {
    this.list$ = this.entityService.getEntity(this.entity.url);
  }

  private generateInProgress() {

  }
}
