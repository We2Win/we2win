/**
 * @file mypost.directive.ts
 * @author
 * @brief a directive just for using 'viewContainerRef's.
 */
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appMypost]'
})
export class MypostDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
