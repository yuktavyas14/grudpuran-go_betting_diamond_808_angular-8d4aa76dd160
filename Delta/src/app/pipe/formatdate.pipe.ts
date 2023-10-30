import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'
@Pipe({
  name: 'formatDate'
})
export class FormatdatePipe implements PipeTransform {

  transform(date: any, args?: any): any {
    let d = new Date(date.replace(/-/g, "/"))

    if (date) {
      return moment(d.toISOString()).format(args);
     }
  }
}
