import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, combineLatest, map, mergeMap, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  pagination: any = {
    previous: '',
    next: '',
    count: 0
  };

  mapperProperties: any = {}
  private item: any;
  private entity: any;
  public entityChange$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  getEntityUrl(url: string) {
    return this.http.get(url).pipe(tap(response => {
      this.updatePagination(response)
    }), map((response: any) => response.results));
  }

  getEntityUrlAndMerge(url: string, secondUrl: string, mapper: string) {
    return this.http.get(url).pipe(tap(response => {
      this.updatePagination(response);
    }), mergeMap((response: any) => {
      const _list: Array<any> = response.results.reduce((a: Array<any>, c: any) => {
        const _url = c[secondUrl];
        if (a && a.length > 0 && !a.includes(_url)) {
          a.push(_url)
        } else if (a && a.length === 0) {
          a = [];
          a.push(_url)
        }
        return a;
      }, []);
      const _mapper = _list.map(l => this.getEntityByIdAndMap(l, mapper));
      return combineLatest(_mapper).pipe(map(res => this.mapResponseResults(response.results, secondUrl)))
    }));
  }

  private mapResponseResults(results: Array<any>, key: string) {
    return results.map((res) => ({...res, [key]: this.mapperProperties[res[key]]}))
  }

  private updatePagination(response: any) {
    this.pagination = {
      previous: response.previous,
      next: response.next,
      count: response.count
    }
  }

  getEntityByIdAndMap(url: string, mapper: string | number) {
    if (this.mapperProperties[url]) {
      return of(this.mapperProperties[url]);
    }
    return this.http.get(url).pipe(map((response: any) => {
      this.mapperProperties[url] = response[mapper];
      return response[mapper];
    }));
  }

  setItem(item: any) {
    this.item = Array.isArray(item) ? item : {...item};
  }

  getItem = () => this.item;

  setEntity(entity: any) {
    this.entity = {...entity};
  }

  getEntity = () => this.entity;
}
