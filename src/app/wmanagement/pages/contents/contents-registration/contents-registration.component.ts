import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ContentsService } from '../../../services/contents.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

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
  uploadForm: FormGroup;

  private forms: object;
  // private symbols: object;
  // public uploader: FileUploader = new FileUploader({
  //   url: 'http://ec2-13-125-222-53.ap-northeast-2.compute.amazonaws.com/api/',
  //   // itemAlias: 'photo'
  // });
  filesToUpload: Array<File> = [];

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
      'I-current-size1': new FormControl('', [Validators.required]),
      'I-current-size2': new FormControl('', [Validators.required]),
      'I-current-size3': new FormControl('', [Validators.required]),
      'I-current-size4': new FormControl('', [Validators.required]),
      'I-current-size5': new FormControl('', [Validators.required]),
      'I-current-amount': new FormControl('', [Validators.required]),
      'I-current-amount1': new FormControl('', [Validators.required]),
      'I-current-amount2': new FormControl('', [Validators.required]),
      'I-current-amount3': new FormControl('', [Validators.required]),
      'I-current-amount4': new FormControl('', [Validators.required]),
      'I-current-amount5': new FormControl('', [Validators.required]),
      'I-around-size1': new FormControl('', [Validators.required]),
      'I-around-size2': new FormControl('', [Validators.required]),
      'I-around-size3': new FormControl('', [Validators.required]),
      'I-around-size4': new FormControl('', [Validators.required]),
      'I-around-size5': new FormControl('', [Validators.required]),
      'I-around-amount': new FormControl('', [Validators.required]),
      'I-around-amount1': new FormControl('', [Validators.required]),
      'I-around-amount2': new FormControl('', [Validators.required]),
      'I-around-amount3': new FormControl('', [Validators.required]),
      'I-around-amount4': new FormControl('', [Validators.required]),
      'I-around-amount5': new FormControl('', [Validators.required]),
      'I-report': new FormControl('', [Validators.required]),

      // 'I-image': new FormControl('', [Validators.required]),
      // 'I-subimage1': new FormControl(''),
      // 'I-subimage2': new FormControl(''),
      // 'I-subimage3': new FormControl(''),
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
      // 'S-subImage1': new FormControl(''),
      // 'S-subImage2': new FormControl(''),
      // 'S-subImage3': new FormControl(''),
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
      'L-title': new FormControl('', [Validators.required]),
      'L-summary': new FormControl('', [Validators.required]),
      'L-url': new FormControl('', [Validators.required]),
      // 'L-file': new FormControl('', [Validators.required]),
    });
    this.meetingForm = new FormGroup({
      'M-title': new FormControl('', [Validators.required]),
      'M-summary': new FormControl('', [Validators.required]),
      // 'M-image': new FormControl('', [Validators.required]),
      'M-host': new FormControl('', [Validators.required]),
      'M-apply-start': new FormControl('', [Validators.required]),
      'M-apply-end': new FormControl('', [Validators.required]),
      'M-duration-start': new FormControl('', [Validators.required]),
      'M-duration-end': new FormControl('', [Validators.required]),
      'M-location': new FormControl('', [Validators.required]),
      'M-personnel': new FormControl('', [Validators.required]),
      'M-cost': new FormControl('', [Validators.required]),
      'M-detail': new FormControl('', [Validators.required]),
      'M-material': new FormControl('', [Validators.required]),
    });
    this.employerForm = new FormGroup({
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
      'E-name': new FormControl('', [Validators.required]),
      'E-sex': new FormControl('', [Validators.required]),
      'E-age-start': new FormControl('', [Validators.required]),
      'E-age-end': new FormControl('', [Validators.required]),
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
    this.uploadForm = new FormGroup({});

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

    // this.symbols = {
    //   '리포트': 'R',
    //   '부동산 뉴스': 'N',
    //   '법률 및 정책': 'L',
    //   '아파트': 'S',
    //   '오피스텔': 'S',
    //   '상가/호텔': 'S',
    //   '토지': 'S',
    //   '오프라인 모임': 'M',
    //   '구인': 'R',
    //   '구직': 'E',
    // };
  }

  upload() {
    const formData: FormData = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);

    for (let i = 0; i < files.length; i++) {
      formData.append('files[]', files[0], files[0]['name']);
    }
    // formData.append("uploads[]", files[0], files[0]['name']);
    // this.address.documents = files.toString();

    this.http.post('http://ec2-13-125-222-53.ap-northeast-2.compute.amazonaws.com/api/v1/upload', formData)
      .subscribe( result => console.log('result', result) );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    // this.product.photo = fileInput.target.files[0]['name'];
  }

  // onFileChange(event, selector) {
  //   const reader = new FileReader();
  //   if (event.target.files && event.target.files.length > 0) {
  //     const file = event.target.files.item(0);
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       console.log(file);
  //       const sType = this.selectedData.type;
  //       this.forms[sType].setControl(selector, new FormControl({
  //         filename: file.name,
  //         filetype: file.type,
  //         value: reader.result.split(',')[1]
  //       }, [Validators.required]));
  //     };
  //   }
  // }

  onSubmit() {
    // console.log(this.forms[this.selectedData.type]);
    if (this.forms[this.selectedData.type].valid) {
      this.selectedData.body = this.forms[this.selectedData.type].value;
      console.log(this.selectedData);
      this.postData(this.selectedData);
    } else {
      alert('양식이 모두 입력되지 않았습니다.');
    }
  }

  postData(selectedData) {
    console.log('selectedData: ', selectedData);
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
