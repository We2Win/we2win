import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { PostingService } from '../../../services/posting.service';
import { MypostDirective } from '../../../directives/mypost.directive';
import { PostItem } from '../../../models/post-item';
import { EmployeeCardComponent } from '../../../micro/employee-card/employee-card.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [ContentsService, PostingService]
})
export class EmployeeComponent implements OnInit {
  Data: Array<object>;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  postItems: PostItem[];

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService
  ) { }

  ngOnInit() {
    this.contentsService.getContentsList('employee').subscribe(
      data => {
        if (data) {
          // console.log(data);
          this.Data = data;
          this.addRecord(this.Data);
        }
      }
    );
  }

  addRecord(records) {
    // tslint:disable-next-line:forin
    for (const record in records) {
      // console.log('record: ', records[record]);
      this.postingService.loadComponent(this.mypostDirective.viewContainerRef,
        new PostItem(EmployeeCardComponent, records[record]));
    }
  }

}
