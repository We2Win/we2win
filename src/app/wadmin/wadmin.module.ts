import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WadminRoutingModule } from './wadmin-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  imports: [
    CommonModule,
    WadminRoutingModule
  ],
  declarations: [NavBarComponent]
})
export class WadminModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/