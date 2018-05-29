import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';
import { ContentsService } from '../../../services/contents.service';

@Component({
  selector: 'app-apply-employee',
  templateUrl: './apply-employee.component.html',
  styleUrls: ['./apply-employee.component.css'],
  providers: [ContentsService]
})
export class ApplyEmployeeComponent implements OnInit {
  applyForm: FormGroup;
  agree2 = false;

  constructor(
    private alertService: AlertService,
    private contentService: ContentsService
  ) { }

  ngOnInit() {
    this.applyForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'sex': new FormControl('', [Validators.required]),
      'age': new FormControl('', [Validators.required]),
      'cp': new FormControl('', [Validators.required]),
      'hp': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required]),
      'homepage': new FormControl('', [Validators.required]),
      'address': new FormControl('', [Validators.required]),
      'part': new FormControl('', [Validators.required]),
      'location': new FormControl('', [Validators.required]),
      'career': new FormControl('', [Validators.required]),
      'achievement': new FormControl('', [Validators.required]),
      'networking': new FormControl('', [Validators.required]),
      'available-start': new FormControl('', [Validators.required]),
      'available-end': new FormControl('', [Validators.required]),
      'intro': new FormControl('', [Validators.required]),
      'etc': new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (!this.agree2) {
      this.alertService.error('이용 약관에 동의하지 않으셨습니다.');
      return;
    } else if (!this.applyForm.valid) {
      this.alertService.error('양식이 모두 입력되지 않았습니다.');
      return;
    }
    console.log(this.applyForm.value);
    this.contentService.addRecruitContent('employee', this.applyForm.value);
  }
}
