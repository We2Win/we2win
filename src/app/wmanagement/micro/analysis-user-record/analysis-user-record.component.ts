import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-analysis-user-record',
  templateUrl: './analysis-user-record.component.html',
  styleUrls: ['./analysis-user-record.component.css'],
})
export class AnalysisUserRecordComponent implements OnInit {
  @Input('record') record;

  constructor(
    private userService: UserService
  ) { }

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
