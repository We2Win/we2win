/**
 * @file group.component.ts
 * @author
 * @brief a micro component for customized form layout.
 * @see structure of this component: \n
 * +--- .subgroup \n
 * |    +--- article \n
 * |    |    +--- label \n
 * |    |    +--- .row \n
 * |    |    \--- (main elements) \n
 * |    \ \n
 * \
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
