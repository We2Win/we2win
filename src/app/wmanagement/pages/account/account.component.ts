import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: [
    './account.component.css',
    '../pages.css'
  ],
  providers: [UserService]
})
export class AccountComponent implements OnInit {
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUserList().subscribe(
      data => {console.log(data);}
    );
  }

}
