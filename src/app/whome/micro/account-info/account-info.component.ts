import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Response, Headers } from '@angular/http';
import { DbConnectService } from '../../../db-connect.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {
  title: 'Testing';
  userForm: FormGroup;
  persons: any[] = [];

  constructor(
    private db: DbConnectService,
    private http: Http
  ) {
    db.getUsers().subscribe(
      (response: Response) => {
        this.persons = response.json();
        console.log(this.persons);
      },
      (error) => { console.log(error); }
    );
  }

  ngOnInit() {
  }

}
