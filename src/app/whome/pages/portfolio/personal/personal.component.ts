import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { UserInfo, DetailedInfo } from '../../../models/userInfo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  userInfo = new UserInfo();
  detailedInfo = new DetailedInfo();

  hopeList = ['투자', '실거주', '모두 해당'];
  editMode = false;

  editForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.userInfo = this.authService.getUserInfo();
    this.authService.getUserInfoDetail(this.userInfo).subscribe(
      (res: any) => {
        this.detailedInfo = res.user;
        console.log(this.detailedInfo);
      },
      (err) => { this.alertService.error(err); }
    );

    this.editForm = new FormGroup({
      'password': new FormControl(''),
      'passwordV': new FormControl(''),
      'cp': new FormControl(''),
      'email': new FormControl(''),
      'hope': new FormControl(''),
      'ha': new FormControl(''),
      'hp': new FormControl(''),
      'oa': new FormControl(''),
      'op': new FormControl(''),
      'info-a': new FormControl(''),
      'sns': new FormControl(''),
    });
  }

  toEditMode() {
    this.editMode = true;
  }

  onSubmit() {
    if (this.editForm.controls['passwordV'].value &&
      this.editForm.controls['password'].value !== this.editForm.controls['passwordV'].value) {
      this.alertService.error('수정한 비밀번호가 일치하지 않습니다.');
      return false;
    } else {
      this.editForm.controls['passwordV'].reset();
    }
    const editedData = {};
    // tslint:disable-next-line:forin
    for (const field in this.editForm.controls) {
      if (this.editForm.controls[field].value) {
        editedData[field] = this.editForm.controls[field].value;
      }
    }
    console.log(editedData);
    this.userService.editUserInfo(editedData).subscribe(
      res => {
        console.log(res);
        this.alertService.success('수정 완료했습니다.');
        this.editMode = false;
        this.editForm.reset();

        // tslint:disable-next-line:forin
        for (const field in editedData) {
          this.detailedInfo[field] = editedData[field];
        }
      },
      error => {
        this.alertService.error('오류가 발생했습니다.');
      }
    );

  }

}
