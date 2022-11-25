import { Pipe, PipeTransform } from '@angular/core';
import {EntityService} from "../../layout/services/entity.service";
import {Observable, of} from "rxjs";

@Pipe({
  name: 'mapper',
  pure: true
})
export class MapperPipe implements PipeTransform {

  constructor(private entityService: EntityService) {
  }

  transform(value: string, format: any | string): Observable<any> {
    if (this.entityService.mapperProperties.hasOwnProperty(value)) {
      return of(this.entityService.mapperProperties[value])
    } else {
      return this.entityService.getEntityByIdAndMap(value, format['mapper']);
    }
  }

}
