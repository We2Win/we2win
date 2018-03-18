import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-account-record',
  templateUrl: './account-record.component.html',
  styleUrls: ['./account-record.component.css']
})
export class AccountRecordComponent implements OnInit {
  @Input('record') record;
  // record: object = {
  //   'ID': '-',
  //   'Name': '-',
  //   'Email': '-',
  //   'ULevel': '-',
  //   'UPoint': '-',
  //   'ULevelStart': '',
  //   'ULevelEnd': ''
  // };
  // recordData: Array<Object> = [
  //   {
  //     'value': 'Christian_Red',
  //     'type': 'id'
  //   },
  //   {
  //     'value': '이유정',
  //     'type': 'plain'
  //   },
  //   {
  //     'value': 'Christian_red@hanmail.net',
  //     'type': 'plain'
  //   },
  //   {
  //     'value': 'PLATINUM',
  //     'type': 'level'
  //   },
  //   {
  //     'value': '999,999',
  //     'type': 'point'
  //   },
  //   {
  //     'value': '2017.12.31 ~ 2018.12.30',
  //     'type': 'plain'
  //   }
  // ];

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    console.log('record in accountRecordComponent: ', this.record);
  }

  deleteUser() {
    if (confirm('정말로 해당 이용자를 삭제하시겠습니까?')) {
      this.userService.deleteUser(this.record);
    }
    // window.location.reload();
  }
}
