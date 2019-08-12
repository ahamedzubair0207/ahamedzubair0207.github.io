import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appVotmCloudNameValidator]'
})
export class VotmCloudNameValidatorDirective {

  constructor(private el: ElementRef) {
   }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent>event;
    if (!(e.which < 48 || e.which > 57))
    {
        e.preventDefault();
    }
  }

}
