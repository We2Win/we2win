import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';
import { ContentsService } from '../../../services/contents.service';

@Component({
  selector: 'app-apply-employer',
  templateUrl: './apply-employer.component.html',
  styleUrls: ['./apply-employer.component.css'],
  providers: [ContentsService]
})
export class ApplyEmployerComponent implements OnInit {
  applyForm: FormGroup;
  agree2 = false;

  constructor(
    private alertService: AlertService,
    private contentService: ContentsService
  ) { }

  ngOnInit() {
    this.applyForm = new FormGroup({
      'part-name': new FormControl('', [Validators.required]),
      'part-description': new FormControl('', [Validators.required]),
      'age-start': new FormControl('', [Validators.required]),
      'age-end': new FormControl('', [Validators.required]),
      'requirement': new FormControl('', [Validators.required]),
      'personnel': new FormControl('', [Validators.required]),
      'method': new FormControl('', [Validators.required]),
      'apply-start': new FormControl('', [Validators.required]),
      'apply-end': new FormControl('', [Validators.required]),
      'detail': new FormControl('', [Validators.required]),
      'location-name': new FormControl('', [Validators.required]),
      'location-address': new FormControl('', [Validators.required]),
      'manager-name': new FormControl('', [Validators.required]),
      'manager-contact': new FormControl('', [Validators.required]),
      'hp': new FormControl('', [Validators.required]),
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
    this.contentService.addEmployerContent(this.applyForm.value);
  }
}
