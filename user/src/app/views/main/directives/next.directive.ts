import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  constructor(private el:ElementRef) { 
  }
  @HostListener('click')
  nextFunc(){
    let elm= this.el.nativeElement.parentElement.parentElement.children[0];
   
    console.log(elm)
   
     let item= elm.getElementsByClassName("img-slide")
     elm.append(item[0])
     console.log(item)
   
    
    

  }

}
 