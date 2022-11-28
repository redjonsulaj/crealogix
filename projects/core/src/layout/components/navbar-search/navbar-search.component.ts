import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {EntityService} from "../../services/entity.service";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'lib-navbar-search, [lib-navbar-search]',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarSearchComponent implements OnInit, OnChanges {
  @Input('search') search: any;
  @Input() entity: any;
  searchHistory: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  searchForm: FormGroup = new FormGroup({searchInput: new FormControl(null, {validators: [Validators.required]})});

  constructor(private cd: ChangeDetectorRef, private http: HttpClient, public entityService: EntityService, private router: Router) {
  }

  ngOnInit() {
    this.initSearchHistory();
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  private initSearchHistory() {
    this.searchHistory.next(Array.from({length: this.search.save}, (v, i) => null));
  }
   researchItem(val: string) {
    this.searchForm.controls["searchInput"].setValue(val);
    this.searchEntity(false);
  }

  private recordHistory(value: any) {
    const historyItemIdx = this.searchHistory.value.findIndex((item: string | null) => !item);
    if (historyItemIdx > -1) {
      this.searchHistory.value[historyItemIdx] = value;
      this.searchHistory.next(this.searchHistory.value);
    }
  }


  searchEntity(newSearch = true) {
    let params = new HttpParams();
    this.search.entities[this.entity].attributes.forEach((attr: string) => params = params.append(attr, this.searchForm.value['searchInput']));

    this.http.get(this.search.url, {params}).subscribe((val: any) => {
      const item = val.results[0];
      this.entityService.setItem(item);
      if (!this.entityService.getEntity()) {
        this.entityService.setEntity(this.search.entity);
      }
      if (newSearch) {
        this.recordHistory(this.searchForm.value['searchInput']);
      }
      const url = item.url.split(this.entity)[1].replace(/.$/, '');
      this.router.navigateByUrl(`${this.entity}${url}`, {...item});
    });
  }

}
