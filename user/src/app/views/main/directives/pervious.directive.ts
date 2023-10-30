import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPervious]'
})
export class PerviousDirective {

  constructor(private el:ElementRef) { 
  }
  @HostListener('click')
  prevFunc(){
    let elm= this.el.nativeElement.parentElement.parentElement.children[0];
     let item= elm.getElementsByClassName("img-slide")
     elm.prepend(item[item.length - 1])
  }

}
 