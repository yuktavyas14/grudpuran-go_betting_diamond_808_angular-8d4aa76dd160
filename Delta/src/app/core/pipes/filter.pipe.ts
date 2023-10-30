import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  /**
   * Filters multiple column value by passing column name and its value.
   * @param value (required) takes array as argument for finding the value.
   * @param propObject (required) takes Object of columns in which value needs to be find.
   */
  transform(value: any, propObject: object): unknown {
    if (value != null && value.length === 0) {
      return value;
    }
    if (propObject && Array.isArray(value)) {
      const filterKeys = Object.keys(propObject);
      return value.filter(item => {
        return filterKeys.some((keyName) => {
          return new RegExp(propObject[keyName], 'gi').test(item[keyName]) || propObject[keyName] === '';
        });
      });
    } else {
      return value;
    }
  }

}
