import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input('type') type: string;
  categories: Object = {
    'account': ['(check)', '아이디', '이름', '이메일', '등급', '포인트', '사용기간'],
    'analysisUser': ['아이디', '이름', '이메일', '등급', '포인트', '금액', '사용기간'],
    'analysisContents': ['No.', '카테고리', '금액', '제목', '댓글수', '게시일'],
    'employer': ['(check)', 'No.', '업무', '모집인원', '채용방법', '모집기간', '승인여부'],
    'employee': ['(check)', 'No.', '성명', '성별', '나이', '핸드폰', '이메일'],
    'tracking': ['No.', '아이디', '이름', '이메일', '직종', '금액', '희망 연봉']
  };

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {

    // tslint:disable-next-line:forin
    for (const str in this.categories) {
      this.categories[str].forEach((el, i, arr) => {
        if (el === '(check)') {
          arr[i] = '<input type=checkbox></input>';
        }
      });
    }

    // console.log(this.categories);
  }

}
