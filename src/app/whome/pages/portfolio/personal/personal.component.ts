import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserInfo } from '../../../../wmanagement/models/userInfo';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  userInfo = new UserInfo();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userInfo = JSON.parse(this.authService.getUserInfo());
  }

}
