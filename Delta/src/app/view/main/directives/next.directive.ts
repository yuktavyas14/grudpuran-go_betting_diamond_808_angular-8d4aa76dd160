import { Directive,ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  constructor(private el: ElementRef) { 
    
  }
@HostListener('click')
nextFunc(){
  let elm= this.el.nativeElement.parentElement.parentElement.children[1];
  let item= elm.getElementsByClassName('Andar-bahar-section')
  elm.append(item[0]);
}
}
