import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ContentsService } from '../../../services/contents.service';

@Component({
  selector: 'app-contents-registration',
  templateUrl: './contents-registration.component.html',
  styleUrls: [
    './contents-registration.component.css',
    '../../pages.css'
  ],
  providers: [ContentsService]
})
export class ContentsRegistrationComponent implements OnInit {
  infoForm: FormGroup;
  newsForm: FormGroup;
  lawForm: FormGroup;
  siteForm: FormGroup;
  meetingForm: FormGroup;
  employerForm: FormGroup;
  employeeForm: FormGroup;

  private forms: object;

  private selectedData = {
    type: '',
    body: {},
  };

  @ViewChild('top') top: any = {
    selected: ''
  };
  @ViewChild('sub') sub: any = {
    selected: ''
  };
  // sample: Observable<Info>;

  @ViewChild('fileInput') fileInput: ElementRef;
  fileToUpload: File = null;

  constructor(
    private fb: FormBuilder,
    private contentsService: ContentsService,
    private router: Router,
    private http: HttpClient
  ) { }


  onTopChange() {
    this.sub.selected = '하위 카테고리';
    this.selectedData.type = '';
    this.selectedData.body = {};
  }

  onSubChange(selected) {
    this.selectedData.type = selected;
    this.selectedData.body = {};
  }

  ngOnInit() {
    this.infoForm = new FormGroup({
      'I-title': new FormControl('', [Validators.required]),
      'I-summary': new FormControl('', [Validators.required]),
      'I-open-start': new FormControl('', [Validators.required]),
      'I-open-end': new FormControl('', [Validators.required]),
      'I-ammount': new FormControl('', [Validators.required]),
      'I-manager-name': new FormControl('', [Validators.required]),
      'I-manager-contact': new FormControl('', [Validators.required]),
      'I-current-size': new FormControl('', [Validators.required]),
      'I-current-amount': new FormControl('', [Validators.required]),
      'I-around-size': new FormControl('', [Validators.required]),
      'I-around-amount': new FormControl('', [Validators.required]),
      'I-report': new FormControl('', [Validators.required]),
      // 'I-image': new FormControl('', [Validators.required]),
    });
    this.siteForm = new FormGroup({
      'S-type': new FormControl('', [Validators.required]),
      'S-title': new FormControl('', [Validators.required]),
      'S-summary': new FormControl('', [Validators.required]),
      'S-open-start': new FormControl('', [Validators.required]),
      'S-open-end': new FormControl('', [Validators.required]),
      'S-ammount': new FormControl('', [Validators.required]),
      'S-manager-name': new FormControl('', [Validators.required]),
      'S-manager-contact': new FormControl('', [Validators.required]),
      'S-current-size': new FormControl('', [Validators.required]),
      'S-current-amount': new FormControl('', [Validators.required]),
      'S-around-size': new FormControl('', [Validators.required]),
      'S-around-amount': new FormControl('', [Validators.required]),
      'S-report': new FormControl('', [Validators.required]),
      // 'S-image': new FormControl('', [Validators.required]),
    });
    this.newsForm = new FormGroup({
      'N-title': new FormControl('', [Validators.required]),
      // 'N-image': new FormControl('', [Validators.required]),
      'N-sub-title': new FormControl('', [Validators.required]),
      'N-sub-description': new FormControl('', [Validators.required]),
      'N-analysis-title': new FormControl('', [Validators.required]),
      'N-analysis-description': new FormControl('', [Validators.required]),
    });
    this.lawForm = new FormGroup({
      'L-id': new FormControl('', [Validators.required]),
      'L-title': new FormControl('', [Validators.required]),
      'L-summary': new FormControl('', [Validators.required]),
      'L-url': new FormControl('', [Validators.required]),
      // 'L-file': new FormControl('', [Validators.required]),
    });
    this.meetingForm = new FormGroup({
      'M-id': new FormControl('', [Validators.required]),
      'M-title': new FormControl('', [Validators.required]),
      'M-summary': new FormControl('', [Validators.required]),
      // 'M-poster': new FormControl('', [Validators.required]),
      'M-host': new FormControl('', [Validators.required]),
      'M-apply-start': new FormControl('', [Validators.required]),
      'M-apply-end': new FormControl('', [Validators.required]),
      'M-duration-start': new FormControl('', [Validators.required]),
      'M-duration-end': new FormControl('', [Validators.required]),
      'M-location': new FormControl('', [Validators.required]),
      'M-personnel': new FormControl('', [Validators.required]),
      'M-cost': new FormControl('', [Validators.required]),
      'M-detail': new FormControl('', [Validators.required]),
    });
    this.employerForm = new FormGroup({
      'R-id': new FormControl('', [Validators.required]),
      'R-part-name': new FormControl('', [Validators.required]),
      'R-part-description': new FormControl('', [Validators.required]),
      'R-age-start': new FormControl('', [Validators.required]),
      'R-age-end': new FormControl('', [Validators.required]),
      'R-requirement': new FormControl('', [Validators.required]),
      'R-personnel': new FormControl('', [Validators.required]),
      'R-method': new FormControl('', [Validators.required]),
      'R-apply-start': new FormControl('', [Validators.required]),
      'R-apply-end': new FormControl('', [Validators.required]),
      'R-detail': new FormControl('', [Validators.required]),
      'R-location-name': new FormControl('', [Validators.required]),
      'R-location-address': new FormControl('', [Validators.required]),
      'R-manager-name': new FormControl('', [Validators.required]),
      'R-manager-contact': new FormControl('', [Validators.required]),
      'R-HP': new FormControl('', [Validators.required]),
      'R-CP': new FormControl('', [Validators.required]),
    });
    this.employeeForm = new FormGroup({
      'E-id': new FormControl('', [Validators.required]),
      'E-name': new FormControl('', [Validators.required]),
      'E-sex': new FormControl('', [Validators.required]),
      'E-age': new FormControl('', [Validators.required]),
      'E-CP': new FormControl('', [Validators.required]),
      'E-HP': new FormControl('', [Validators.required]),
      'E-email': new FormControl('', [Validators.required]),
      'E-homepage': new FormControl('', [Validators.required]),
      'E-address': new FormControl('', [Validators.required]),
      'E-part': new FormControl('', [Validators.required]),
      'E-location': new FormControl('', [Validators.required]),
      'E-career': new FormControl('', [Validators.required]),
      'E-achievement': new FormControl('', [Validators.required]),
      'E-networking': new FormControl('', [Validators.required]),
      'E-available-start': new FormControl('', [Validators.required]),
      'E-available-end': new FormControl('', [Validators.required]),
      'E-intro': new FormControl('', [Validators.required]),
      'E-etc': new FormControl('', [Validators.required]),
    });

    this.forms = {
      '리포트': this.infoForm,
      '부동산 뉴스': this.newsForm,
      '법률 및 정책': this.lawForm,
      '아파트': this.siteForm,
      '오피스텔': this.siteForm,
      '상가/호텔': this.siteForm,
      '토지': this.siteForm,
      '오프라인 모임': this.meetingForm,
      '구인': this.employerForm,
      '구직': this.employeeForm
    };
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files.item(0);
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(file);
        this.infoForm.addControl('I-image', new FormControl({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        }, [Validators.required]));
      };
    }
  }

  onSubmit() {
    console.log(this.forms[this.selectedData.type]);
    if (this.forms[this.selectedData.type].valid) {
      this.selectedData.body = this.forms[this.selectedData.type].value;
      console.log(this.selectedData);

      this.postData(this.selectedData);
    } else {
      alert('양식이 모두 입력되지 않았습니다.');
    }

    // this.sample = this.http.get<Info>('/api/infos');
    // console.log(this.sample);
    // this.infoService.getAll()
    //   .subscribe(
    //     data => { console.log(data); } );


    // if (!this.sub.selected) {
    //   alert('세부 카테고리가 선택되지 않았습니다.');
    //   return -1;
    // }

    // if (this.top.selected === '분양 현장') {
    //   this.siteForm.addControl('S-type', new FormControl(this.sub.selected));
    // } else {
    //   switch (this.sub.selected) {
    //     case '리포트':
    //       console.log(this.infoForm.value);
    //       this.postData(this.infoForm);
    //       break;
    //     case '뉴스':
    //       console.log(this.newsForm.value);
    //       this.postData(this.newsForm);
    //       break;
    //     case '법률 및 정책':
    //       console.log(this.lawForm.value);
    //       this.postData(this.lawForm);
    //       break;
    //     case '오프라인 모임':
    //       console.log(this.meetingForm.value);
    //       this.postData(this.meetingForm);
    //       break;
    //     case '구인':
    //       console.log(this.employerForm.value);
    //       this.postData(this.employerForm);
    //       break;
    //     case '구직':
    //       console.log(this.employeeForm.value);
    //       this.postData(this.employeeForm);
    //       break;
    //   }
    // }

  }

  postData(selectedData) {
    this.contentsService.create(selectedData)
      .subscribe(
      data => {
        alert((data) ? 'success!' : 'failed..');
        console.log(data);
      },
      error => {
        alert('불러오기에 실패하였습니다.');
        console.log('error: ', error);
      }
      );
  }
}
