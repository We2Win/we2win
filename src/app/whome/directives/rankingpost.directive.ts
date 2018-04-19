import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRankingpost]'
})
export class RankingpostDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
@Directive({
  selector: '[appRankingpost1]'
})
export class Rankingpost1Directive {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
@Directive({
  selector: '[appRankingpost2]'
})
export class Rankingpost2Directive {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
@Directive({
  selector: '[appRankingpost3]'
})
export class Rankingpost3Directive {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
