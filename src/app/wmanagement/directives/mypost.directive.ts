import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appMypost]'
})
export class MypostDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
