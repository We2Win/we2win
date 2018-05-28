import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentsService } from '../../services/contents.service';
import { PostingService } from '../../services/posting.service';
import { PostItem } from '../../models/post-item';
import { TableComponent } from '../../micro/table/table.component';
import { MypostDirective } from '../../directives/mypost.directive';
import { EmployerRecordComponent } from '../../micro/employer-record/employer-record.component';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: [
    './employee.component.css',
    '../pages.css'
  ]
})
export class EmployeeComponent implements OnInit {
  List: Array<object>;
  total: number;

  @ViewChild(TableComponent)
  private tableComponent: TableComponent;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  @ViewChild('sample') sample;
  @ViewChild('popupCsv') popupCsv;

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService
  ) { }

  ngOnInit() {
    this.contentsService.getEmployerList().subscribe(
      data => {
        this.List = data;
        console.log('list: ', this.List);
        this.total = this.List.length;
        this.addRecord(this.List);
      }
    );
  }

  addRecord(records) {
    // tslint:disable-next-line:forin
    for (const record in records) {
      console.log('record: ', records[record]);
      this.postingService.loadComponent(this.mypostDirective.viewContainerRef,
        new PostItem(EmployerRecordComponent, records[record]));
    }
  }

  viewPopup() {
    this.popupCsv.showPopup();
  }

  download(type) {
    switch (type) {
      case 'all':
        const data = [
          {
            name: 'Test 1',
            age: 13,
            average: 8.2,
            approved: true,
            description: 'using Content here, content here '
          },
          {
            name: 'Test 2',
            age: 11,
            average: 8.2,
            approved: true,
            description: 'using Content here, content here '
          },
          {
            name: 'Test 4',
            age: 10,
            average: 8.2,
            approved: true,
            description: 'using Content here, content here '
          },
        ];

        // tslint:disable-next-line:no-unused-expression
        new Angular2Csv(data, 'My Report');
        break;
    }
  }

}
