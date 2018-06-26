/**
 * @file account-record.component.ts
 * @author
 * @brief a micro component for account record in table component.
 */
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router/';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'app-account-record',
  templateUrl: './account-record.component.html',
  styleUrls: ['./account-record.component.css'],
})
export class AccountRecordComponent implements OnInit {
  @Input('record') record;
  checked = false;

  constructor(
    private userService: UserService,
    private recordService: RecordService,
    private router: Router
  ) { }

  ngOnInit() {
    // console.log('record in accountRecordComponent: ', this.record);
  }

  editUser() {

  }

  checkBox() {
    this.checked = !this.checked;
    this.recordService.emitChange(this.record['u-id'], this.checked);
  }

  deleteUser() {
    if (confirm('정말로 해당 이용자를 삭제하시겠습니까?')) {
      this.userService.deleteUser(this.record)
        .subscribe(
        data => {
          // console.log(data);
          // refresh current page
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(['mng', 'account']));
        });
    }
  }
}
