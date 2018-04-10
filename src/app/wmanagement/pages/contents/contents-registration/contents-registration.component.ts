import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContentsService } from '../../../services/contents.service';
import { UploadFileService } from '../../../services/upload-file.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-contents-registration',
  templateUrl: './contents-registration.component.html',
  styleUrls: [
    './contents-registration.component.css',
    '../../pages.css'
  ],
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
  uploadForm2: FormGroup;
  uploadForm3: FormGroup;
  uploadForm4: FormGroup;
  uploadForm5: FormGroup;

  private forms: object;
  private symbols = {
    '리포트': 'I',
    '부동산 뉴스': 'N',
    '법률 및 정책': 'L',
    '아파트': 'S',
    '오피스텔': 'S',
    '상가/호텔': 'S',
    '토지': 'S',
    '오프라인 모임': 'M',
    '구인': 'R',
    '구직': 'E',
    'info': 'I',
    'news': 'N',
    'law': 'L',
    'site': 'S',
    'meeting': 'M',
    'employer': 'R',
    'employee': 'E'
  };

  filesToUpload: Array<File>;

  selectedData = {
    type: '리포트',
    body: {},
  };
  private selectBoxData = {};

  @ViewChild('top') top: { selected };
  @ViewChild('sub') sub: { selected };

  @ViewChild('ILevel') ILevel: { selected };
  @ViewChild('SLevel') SLevel: { selected };
  @ViewChild('NLevel') NLevel: { selected };
  @ViewChild('LLevel') LLevel: { selected };
  @ViewChild('MLevel') MLevel: { selected };

  @ViewChild('I1') I1;
  @ViewChild('I2') I2;
  @ViewChild('I3') I3;
  @ViewChild('I4') I4;
  @ViewChild('I5') I5;
  @ViewChild('I6') I6;
  @ViewChild('I7') I7;
  @ViewChild('I8') I8;
  @ViewChild('I9') I9;
  @ViewChild('I10') I10;
  @ViewChild('I11') I11;
  @ViewChild('I12') I12;

  inputs: object;

  uploadedFiles = {
    '-image': '',
    '-subImage1': '',
    '-subImage2': '',
    '-subImage3': '',
    '-subImage4': '',
    '-subImage5': '',
    '-file': '',
  };

  subscription: Subscription;

  // _editor;
  public editor;
  private toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike', { 'color': [] }],        // toggled buttons
    [{ 'align': [] }, { 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    ['blockquote', { 'script': 'sub' }, { 'script': 'super' }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] },
    { 'header': 1 }, { 'header': 2 }],
    ['clean'],                                        // remove formatting button
  ];
  public editorOptions = {
    placeholder: '내용을 입력해 주세요.',
    modules: {
      toolbar: this.toolbarOptions
    },
  };

  constructor(
    private fb: FormBuilder,
    private contentsService: ContentsService,
    private uploadService: UploadFileService,
    private router: Router,
    private http: HttpClient,
    private elementRef: ElementRef
  ) {
  }


  onTopChange() {
    this.sub.selected = '하위 카테고리';
    this.selectedData.type = '';
    this.selectedData.body = {};
    this.selectBoxData = {};
  }

  onSubChange(selected) {
    this.selectedData.type = selected;
    this.selectedData.body = {};
    this.selectBoxData = {};

    switch (selected) {
      case '아파트':
      case '오피스텔':
      case '상가/호텔':
      case '토지':
        this.siteForm.controls['S-type'].setValue(selected);
        break;
    }

    // tslint:disable-next-line:forin
    for (const i in this.uploadedFiles) {
      this.uploadedFiles[i] = '';
    }
    // tslint:disable-next-line:forin
    for (const i in this.inputs) {
      this.inputs[i] = '파일 없음';
    }
  }

  onLevelChange(type) {
    switch (type) {
      case 'info':
        this.selectBoxData[this.symbols[type] + '-level'] = this.ILevel.selected;
        break;
      case 'site':
        this.selectBoxData[this.symbols[type] + '-level'] = this.SLevel.selected;
        break;
      case 'news':
        this.selectBoxData[this.symbols[type] + '-level'] = this.NLevel.selected;
        break;
      case 'law':
        this.selectBoxData[this.symbols[type] + '-level'] = this.LLevel.selected;
        break;
      case 'meeting':
        this.selectBoxData[this.symbols[type] + '-level'] = this.MLevel.selected;
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    this.infoForm = new FormGroup({
      // 'I-level': new FormControl(''),
      'I-notification': new FormControl(''),
      'I-title': new FormControl('', [Validators.required]),
      'I-summary': new FormControl('', [Validators.required]),
      'I-open-start': new FormControl('', [Validators.required]),
      'I-open-end': new FormControl('', [Validators.required]),
      'I-ammount': new FormControl('', [Validators.required]),
      'I-manager-name': new FormControl('', [Validators.required]),
      'I-manager-contact': new FormControl('', [Validators.required]),
      'I-current-duration1': new FormControl(''),
      'I-current-duration2': new FormControl(''),
      'I-current-duration3': new FormControl(''),
      'I-current-duration4': new FormControl(''),
      'I-current-duration5': new FormControl(''),
      'I-current-amount1': new FormControl(''),
      'I-current-amount2': new FormControl(''),
      'I-current-amount3': new FormControl(''),
      'I-current-amount4': new FormControl(''),
      'I-current-amount5': new FormControl(''),
      'I-around-duration1': new FormControl(''),
      'I-around-duration2': new FormControl(''),
      'I-around-duration3': new FormControl(''),
      'I-around-duration4': new FormControl(''),
      'I-around-duration5': new FormControl(''),
      'I-around-amount1': new FormControl(''),
      'I-around-amount2': new FormControl(''),
      'I-around-amount3': new FormControl(''),
      'I-around-amount4': new FormControl(''),
      'I-around-amount5': new FormControl(''),
      'I-report': new FormControl('', [Validators.required]),
      'I-image': new FormControl('', [Validators.required]),
      'I-subImage1': new FormControl(''),
      'I-subImage2': new FormControl(''),
      'I-subImage3': new FormControl(''),
      'I-subImage4': new FormControl(''),
      'I-subImage5': new FormControl(''),
    });
    this.siteForm = new FormGroup({
      'S-type': new FormControl('', [Validators.required]),
      // 'S-level': new FormControl(''),
      'S-notification': new FormControl(''),
      'S-title': new FormControl('', [Validators.required]),
      'S-summary': new FormControl('', [Validators.required]),
      'S-open-start': new FormControl('', [Validators.required]),
      'S-open-end': new FormControl('', [Validators.required]),
      'S-ammount': new FormControl('', [Validators.required]),
      'S-manager-name': new FormControl('', [Validators.required]),
      'S-manager-contact': new FormControl('', [Validators.required]),
      'S-current-duration1': new FormControl(''),
      'S-current-duration2': new FormControl(''),
      'S-current-duration3': new FormControl(''),
      'S-current-duration4': new FormControl(''),
      'S-current-duration5': new FormControl(''),
      'S-current-amount1': new FormControl(''),
      'S-current-amount2': new FormControl(''),
      'S-current-amount3': new FormControl(''),
      'S-current-amount4': new FormControl(''),
      'S-current-amount5': new FormControl(''),
      'S-around-duration1': new FormControl(''),
      'S-around-duration2': new FormControl(''),
      'S-around-duration3': new FormControl(''),
      'S-around-duration4': new FormControl(''),
      'S-around-duration5': new FormControl(''),
      'S-around-amount1': new FormControl(''),
      'S-around-amount2': new FormControl(''),
      'S-around-amount3': new FormControl(''),
      'S-around-amount4': new FormControl(''),
      'S-around-amount5': new FormControl(''),
      'S-report': new FormControl('', [Validators.required]),

      'S-image': new FormControl('', [Validators.required]),
      'S-subImage1': new FormControl(''),
      'S-subImage2': new FormControl(''),
      'S-subImage3': new FormControl(''),
      'S-subImage4': new FormControl(''),
      'S-subImage5': new FormControl(''),
    });
    this.newsForm = new FormGroup({
      // 'N-level': new FormControl('', [Validators.required]),
      'N-notification': new FormControl(''),
      'N-title': new FormControl('', [Validators.required]),
      'N-sub-title': new FormControl('', [Validators.required]),
      'N-sub-description': new FormControl('', [Validators.required]),
      'N-image': new FormControl('', [Validators.required]),
      'N-subImage1': new FormControl('', [Validators.required]),
      'N-analysis-title': new FormControl('', [Validators.required]),
      'N-analysis-description': new FormControl('', [Validators.required]),
    });
    this.lawForm = new FormGroup({
      'L-notification': new FormControl(''),
      'L-title': new FormControl('', [Validators.required]),
      'L-summary': new FormControl('', [Validators.required]),
      'L-file': new FormControl('', [Validators.required]),
      // 'L-file': new FormControl('', [Validators.required]),
    });
    this.meetingForm = new FormGroup({
      'M-notification': new FormControl(''),
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
      'E-Image': new FormControl('', [Validators.required]),
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
    this.uploadForm2 = new FormGroup({});
    this.uploadForm3 = new FormGroup({});
    this.uploadForm4 = new FormGroup({});
    this.uploadForm5 = new FormGroup({});

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

    this.inputs = {
      '-image': '파일 없음',
      '-subImage1': '파일 없음',
      '-subImage2': '파일 없음',
      '-subImage3': '파일 없음',
      '-subImage4': '파일 없음',
      '-subImage5': '파일 없음',
      '-file': '파일 없음'
    };
  }

  selectFile(event, columnName) {
    this.uploadedFiles[columnName] = event.target.files.item(0);
    this.inputs[columnName] = '파일 없음';

    // console.log(this.uploadedFiles);
  }

  upload(type, columnName) {
    console.log('type: ', type);
    const file = this.uploadedFiles[columnName];

    if (file) {
      this.uploadService.uploadFile(file, columnName);
      this.subscription = this.uploadService.getFileName(columnName)
        .map(
        data => data.Key
        ).subscribe(
        name => {
          console.log('name: ', name);
          console.log(this.forms[type], this.symbols[type] + columnName);
          this.forms[type].controls[this.symbols[type] + columnName].setValue(name);
          this.inputs[columnName] = name.split('/')[1];
          console.log(this.inputs);
          this.uploadedFiles[columnName] = '-done';
          // alert('업로드 되었습니다.');
        }
        );
    } else {
      alert('선택한 파일이 없습니다.');
    }
  }

  onSubmit() {
    this.selectedData.body = this.forms[this.selectedData.type].value;
    this.selectedData.body = Object.assign(this.selectedData.body, this.selectBoxData);
    console.log(this.selectedData);

    if (this.forms[this.selectedData.type].valid) {
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
        alert((data) ? '컨텐츠가 등록되었습니다.' : '오류가 발생했습니다.');
        console.log(data);
      },
      error => {
        alert('컨텐츠 등록에 실패하였습니다.');
        console.log('error: ', error);
      }
      );
  }

}
