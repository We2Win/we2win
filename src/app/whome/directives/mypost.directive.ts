import { Directive } from '@angular/core';
import { ViewContainerRef } from '@angular/core/src/linker/view_container_ref';

@Directive({
  selector: '[appMypost]'
})
export class MypostDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
