import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-input',
  templateUrl: './list-input.component.html',
  styleUrls: ['./list-input.component.css']
})
export class ListInputComponent implements OnInit {
  @Input() type: string;

  categories: Object = {
    '평형': ['40평형', '45평형', '50평형', '60평형', '70평형'],
    '시세': ['5,000만원 미만', '1억 미만', '3억 미만', '5억 미만', '5억 이상']
  };

  constructor() { }

  ngOnInit() {
  }

}
