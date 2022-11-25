import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs";

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
