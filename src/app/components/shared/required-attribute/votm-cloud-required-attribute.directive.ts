import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[votmrequired]'
})
export class VotmCloudRequiredAttributeDirective {

  constructor(private el: ElementRef) { }
  ngAfterViewInit(){
    let label = this.el.nativeElement.innerText;
    // if(label === 'Primary Contact:'){
    //   debugger;
    // }
    this.el.nativeElement.innerHTML = `<b><span style="color:red;">*</span></b> ${label}`
  }

}
