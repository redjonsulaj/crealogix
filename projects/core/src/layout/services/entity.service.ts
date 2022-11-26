import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {combineLatest, forkJoin, map, mergeMap, of, tap} from "rxjs";

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

  constructor(private http: HttpClient) { }

  getEntity(url: string) {
    return this.http.get(url).pipe(tap(response => {
      this.updatePagination(response)
    }), map( (response: any) => response.results));
  }

  getEntityAndMerge(url: string, secondUrl: string) {
    return this.http.get(url).pipe(tap(response => {
      this.updatePagination(response);
    }), mergeMap( (response: any) => {
      const _list: Array<any> = response.results.reduce( (a: Array<any>,c: any) => {
        const _url = c[secondUrl];
        if (a && a.length > 0 && !a.includes(_url)) {
          a.push(_url)
        } else if (a && a.length === 0) {
          a = [];
          a.push(_url)
        }
        return a;
      }, []);
      console.log(39, _list);
      const _mapper = _list.map(l => this.getEntityByIdAndMap(l, secondUrl));
      console.log(41, _mapper)
      return combineLatest({..._mapper}).pipe(
        tap( _res => {
          console.log(42, _res);
        }), map( res => {
          return response.results;
        }))
    }));
  }

  private updatePagination(response: any) {
    this.pagination = {
      previous: response.previous,
      next: response.next,
      count: response.count
    }
  }

  getEntityByIdAndMap(url: string, mapper: string | number) {
    return this.http.get(url).pipe(map( (response: any) => {
      this.mapperProperties[url] = response[mapper];
      return response[mapper];
    }));
  }

}
