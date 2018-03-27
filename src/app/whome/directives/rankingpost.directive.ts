import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRankingpost]'
})
export class RankingpostDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
