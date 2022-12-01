import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {EntityService} from "../../services/entity.service";
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

  constructor(private cd: ChangeDetectorRef, private http: HttpClient, public entityService: EntityService) {
  }

  ngOnInit() {
    this.initSearchHistory();
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  public initSearchHistory() {
    this.searchHistory.next(Array.from({length: this.search.save}, (v, i) => null));
  }

  researchItem(val: string) {
    this.searchForm.controls["searchInput"].setValue(val);
    this.searchEntity(false);
  }

  private recordHistory(value: any) {
    let savedSearch = false;
    this.searchHistory.next(
      this.searchHistory.value.map(
        (item: string | null) => {
          if (!savedSearch && !item) {
            savedSearch = true;
            return {value, entity: this.entity};
          }
          return item;
        }
      )
    )
  }


  searchEntity(newSearch = true) {
    let params = new HttpParams();
    this.search.entities[this.entity].attributes.forEach((attr: string) => params = params.append(attr, this.searchForm.value['searchInput']));
    this.http.get(this.search.url, {params}).subscribe((val: any) => {
      if (val.results.length) {
        this.entityService.setItem(val.results);
        if (newSearch) {
          this.recordHistory(this.searchForm.value['searchInput']);
        }
        this.entityService.entityChange$.next(true);
      } else {
        this.searchForm.setErrors({noResults: 'This search did not produce any results'});
        this.cd.markForCheck();
        setTimeout(() => {
          this.searchForm.setErrors(null);
          this.searchForm.reset();
          this.cd.markForCheck()
        }, 2000)
      }
    });
  }

}
