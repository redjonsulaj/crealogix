import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'transform',
  pure: true
})
export class TransformPipe implements PipeTransform {

  constructor() {
  }

  transform(value: string, format: any | string): string {
    if (typeof format === 'string') {
      return value;
    } else if (format.hasOwnProperty('condition')) {
      const _find = Object.keys(format.condition).find(key => Number(value) > Number(key.split('-')[1]));
      return !!_find ? format.condition[_find] : 'Out of range!';
    }
    return value;
  }
}
