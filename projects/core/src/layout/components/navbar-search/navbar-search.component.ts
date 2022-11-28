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

@Component({
  selector: 'lib-navbar-search, [lib-navbar-search]',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarSearchComponent implements OnInit, OnChanges {
  @Input('search') search: any;
  @Input() entity: any;
  searchHistory: any = [];
  searchForm: FormGroup = new FormGroup({searchInput: new FormControl(null, {validators: [Validators.required]})});

  constructor(private cd: ChangeDetectorRef, private http: HttpClient, public entityService: EntityService, private router: Router) {
  }

  ngOnInit() {
    this.initSearchHistory();
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  private initSearchHistory() {
    this.searchHistory = Array.from({length: this.search.save}, (v, i) => i);
  }

  searchEntity() {
    let params = new HttpParams();
    this.search.entities[this.entity].attributes
      .forEach((attr: string) => params = params.append(attr, this.searchForm.value['searchInput']));
    this.http.get(this.search.url, {params}).subscribe((val: any) => {
      const item = val.results[0];
      this.entityService.setItem(item);
      if (!this.entityService.getEntity()) {
        this.entityService.setEntity(this.search.entity);
      }
      const url = item.url.split(this.entity)[1].replace(/.$/, '');
      this.router.navigateByUrl(`${this.entity}${url}`, {...item});
    });
  }

}
