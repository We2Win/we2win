import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
      'part-name': new FormControl,
      'part-description': new FormControl,
      'age-start': new FormControl,
      'age-end': new FormControl,
      'requirement': new FormControl,
      'personnel': new FormControl,
      'method': new FormControl,
      'apply-start': new FormControl,
      'apply-end': new FormControl,
      'detail': new FormControl,
      'location-name': new FormControl,
      'location-address': new FormControl,
      'manager-name': new FormControl,
      'manager-contact': new FormControl,
      'hp': new FormControl,
    });
  }

  onSubmit() {
    if (!this.agree2) {
      this.alertService.error('이용 약관에 동의하지 않으셨습니다.');
      return;
    }
    console.log(this.applyForm.value);
    this.contentService.addEmployerContent(this.applyForm.value);
  }
}
