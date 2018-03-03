import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Info } from '../../../models/info';
import { InfoService } from '../../../services/info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contents-registration',
  templateUrl: './contents-registration.component.html',
  styleUrls: [
    './contents-registration.component.css',
    '../../pages.css'
  ]
})
export class ContentsRegistrationComponent implements OnInit {
  infoForm: FormGroup;
  private info: Info;

  constructor(
    private fb: FormBuilder,
    private infoService: InfoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.infoForm = new FormGroup({
      Title: new FormControl('', [Validators.required, Validators.minLength(4)]),
      Description: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
    console.log(this.infoForm);
  }

  onSubmit() {
    alert('doing..');
    if (this.infoForm.valid) {
      this.info = this.infoForm.value;
      console.log(JSON.stringify(this.info));
      this.infoService.create(this.info)
        // this.userService.try()
        .subscribe(
        data => {
          alert('done!');
        },
        error => {
          alert('불러오기에 실패하였습니다.');
          console.log('error: ', error);
        }
        );
    } else {
      alert('양식에 맞게 작성해주세요');
    }
  }
}
