import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { DbConnectService } from '../../../db-connect.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
// import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
  providers: [
    DbConnectService,
    // UserService,
    AuthService,
  ]
})
export class AccountInfoComponent implements OnInit {
  title: 'Testing';
  userForm: FormGroup;
  persons: any[] = [];

  currentUser: User;
  users: User[] = [];

  constructor(
    // type 1:
    // private db: DbConnectService,
    // private http: Http,

    // type 2:
    // private userService: UserService,

    // type 3:
    private authService: AuthService
  ) {
    // type 2:
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(this.currentUser);

    // type 1:
    // db.getUsers().subscribe(
    //   (response: Response) => {
    //     // this.persons = response.json();
    //     console.log('Hello:');
    //     console.log(response);
    //     console.log('done.');
    //   },
    //   (error) => { console.log(error); }
    // );
  }

  ngOnInit() {
    // this.authService.setToken('hello');
  }

  // type 2:
  // deleteUser(ID: number) {
  //   this.userService.delete(ID).subscribe(() => {
  //     this.loadAllUsers();
  //   });
  // }

  // private loadAllUsers() {
  //   this.userService.getAll().subscribe(users => {
  //     this.users = users;
  //   });
  // }

}
