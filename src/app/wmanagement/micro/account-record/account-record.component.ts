import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router/';

@Component({
  selector: 'app-account-record',
  templateUrl: './account-record.component.html',
  styleUrls: ['./account-record.component.css']
})
export class AccountRecordComponent implements OnInit {
  @Input('record') record;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('record in accountRecordComponent: ', this.record);
  }

  deleteUser() {
    if (confirm('정말로 해당 이용자를 삭제하시겠습니까?')) {
      this.userService.deleteUser(this.record)
        .subscribe(
        data => {
          console.log(data);
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(['mng', 'account']));
        });
    }
  }
}
