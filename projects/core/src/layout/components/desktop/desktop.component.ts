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
  constructor(public layoutService: LayoutService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.initSearch();
  }

  private initSearch() {
    if (this.layoutService.config.hasOwnProperty('search')) {
      this.search = {...this.layoutService.config.search};
      this.cd.detectChanges();
    }
  }

}
