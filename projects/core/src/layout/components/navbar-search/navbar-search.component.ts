import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'lib-navbar-search, [lib-navbar-search]',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarSearchComponent implements OnInit, OnChanges{
  @Input('search') search: any;
  searchHistory: any = [];

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    console.log(this.search);
    this.initSearchHistory();
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  private initSearchHistory() {
    this.searchHistory = Array.from({length: this.search.save}, (v, i) => i);
  }

}
