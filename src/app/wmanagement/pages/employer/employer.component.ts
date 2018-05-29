import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentsService } from '../../services/contents.service';
import { PostingService } from '../../services/posting.service';
import { PostItem } from '../../models/post-item';
import { TableComponent } from '../../micro/table/table.component';
import { MypostDirective } from '../../directives/mypost.directive';
import { EmployerRecordComponent } from '../../micro/employer-record/employer-record.component';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: [
    './employer.component.css',
    '../pages.css'
  ],
  providers: [
    PostingService,
    RecordService
  ]
})
export class EmployerComponent implements OnInit {
  List: Array<object>;
  selectedList: Array<string> = [];
  total: number;

  @ViewChild(TableComponent)
  private tableComponent: TableComponent;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  @ViewChild('sample') sample;
  @ViewChild('popupCsv') popupCsv;

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService,
    private recordService: RecordService
  ) { }

  ngOnInit() {
    this.getList();
    this.recordService.change.subscribe(
      data => {
        if (data.checked) {
          this.selectedList.push(data['c-id']);
        } else {
          // remove c-id from selectedList
          const index = this.selectedList.indexOf(data['c-id']);
          if (index !== -1) {
            this.selectedList.splice(index, 1);
          }
        }
      }
    );
  }

  getList() {
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
    const ref = this.mypostDirective.viewContainerRef;
    ref.clear();
    // tslint:disable-next-line:forin
    for (const record in records) {
      console.log('record: ', records[record]);
      this.postingService.loadComponent(ref,
        new PostItem(EmployerRecordComponent, records[record]));
    }
  }

  confirm() {
    this.contentsService.confirmEmployers(this.selectedList);
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
