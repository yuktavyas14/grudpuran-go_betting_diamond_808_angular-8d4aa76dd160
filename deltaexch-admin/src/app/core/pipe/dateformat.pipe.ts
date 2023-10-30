import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
name: "formateDate"
})
export class FormatDatePipe implements PipeTransform {

transform(date: string): unknown {
// return date ? new Date(date.replace(/-/g, "/")).toISOString() : null;
return date ? new Date(date).toISOString() : null;
}

}
