import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  userInfo;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userInfo = this.authService.getUserInfoDetail();
  }

}
