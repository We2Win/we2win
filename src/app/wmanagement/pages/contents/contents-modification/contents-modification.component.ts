import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Quill from 'quill';
import { ContentsService } from '../../../services/contents.service';
import { UploadFileService } from '../../../services/upload-file.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { setInterval } from 'timers';

@Component({
  selector: 'app-contents-modification',
  templateUrl: './contents-modification.component.html',
  styleUrls: [
    './contents-modification.component.css',
    '../../pages.css'
  ],
  providers: [
    ContentsService,
    UploadFileService
  ]
})
export class ContentsModificationComponent implements OnInit {
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
  private engType = {
    '리포트': 'report',
    '부동산 뉴스': 'news',
    '법률 및 정책': 'law',
    '아파트': 'apartment',
    '오피스텔': 'officetel',
    '상가/호텔': 'commercial',
    '토지': 'ground',
    '오프라인 모임': 'meeting',
    '구인': 'employee',
    '구직': 'employer',
  };

  filesToUpload: Array<File>;

  selectedData = {
    type: '리포트',
    body: {},
  };
  private selectBoxData = {};

  @ViewChild('top') top: { selected };
  @ViewChild('sub') sub: { selected };
  @ViewChild('contents') contents: { categories, selected };

  @ViewChild('ILevel') ILevel: { selected };
  @ViewChild('SLevel') SLevel: { selected };
  @ViewChild('NLevel') NLevel: { selected };
  @ViewChild('LLevel') LLevel: { selected };
  @ViewChild('MLevel') MLevel: { selected };
  levels = {
    'I-level': this.ILevel,
    'S-level': this.SLevel,
    'N-level': this.NLevel,
    'L-level': this.LLevel,
    'M-level': this.MLevel,
  };

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

  public loadedData;

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

    this.updateContents(selected);

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

  updateContents(selected) {
    this.contentsService.getContentsList(this.engType[selected]).subscribe(
      data => {
        const titles = [];
        this.loadedData = JSON.parse(data.list);
        // tslint:disable-next-line:forin
        for (const record in this.loadedData) {
          titles.push(this.loadedData[record][this.symbols[selected] + '-title']);
        }
        if (titles[0]) {
          this.contents.categories['컨텐츠 제목'] = titles;
          this.contents.selected = '컨텐츠 제목';
        } else {
          this.contents.categories['컨텐츠 제목'] = [];
          this.contents.selected = '컨텐츠가 없습니다.';
        }
        console.log('updated: ', this.loadedData);
      },
      error => {
        console.log('error loading contents');
      }
    );
  }

  onContentsChange(num) {
    // console.log('apply: ', this.loadedData[num]);
    const form = this.forms[this.selectedData.type];
    // const symbol = form.controls;
    // console.log(symbol);
    // tslint:disable-next-line:forin
    for (const control in form.controls) {
      let lastname: any = control.split('-');
      lastname = lastname[lastname.length - 1];
      if (lastname === 'start' || lastname === 'end') {
        form.controls[control].setValue(this.loadedData[num][control].slice(0, 10));
      } else if (lastname === 'level') {
        console.log(lastname, this.levels[control].selected);
        this.levels[control].selected = this.selectBoxData[control];
      } else {
        form.controls[control].setValue(this.loadedData[num][control]);
        this.inputs[control.slice(1)] = this.loadedData[num][control];
      }
    }
  }

  onLevelChange(_type) {
    const type = this.symbols[_type] + '-level';
    this.selectBoxData[type] = this.levels[type].selected;
    // switch (type) {
    //   case 'info':
    //     this.selectBoxData[this.symbols[type] + '-level'] = this[this.symbols[type] + '-level'].selected;
    //     break;
    //   case 'site':
    //     this.selectBoxData[this.symbols[type] + '-level'] = this.SLevel.selected;
    //     break;
    //   case 'news':
    //     this.selectBoxData[this.symbols[type] + '-level'] = this.NLevel.selected;
    //     break;
    //   case 'law':
    //     this.selectBoxData[this.symbols[type] + '-level'] = this.LLevel.selected;
    //     break;
    //   case 'meeting':
    //     this.selectBoxData[this.symbols[type] + '-level'] = this.MLevel.selected;
    //     break;
    //   default:
    //     break;
    // }
  }

  ngOnInit() {
    this.infoForm = new FormGroup({
      'I-id': new FormControl('', [Validators.required]),
      // 'I-level': new FormControl(''),
      'I-notification': new FormControl(''),
      'I-title': new FormControl('', [Validators.required]),
      'I-summary': new FormControl('', [Validators.required]),
      'I-open-start': new FormControl('', [Validators.required]),
      'I-open-end': new FormControl('', [Validators.required]),
      'I-ammount': new FormControl('', [Validators.required]),
      'I-manager-name': new FormControl('', [Validators.required]),
      'I-manager-contact': new FormControl('', [Validators.required]),
      'I-current-duration1': new FormControl('', [Validators.required]),
      'I-current-duration2': new FormControl('', [Validators.required]),
      'I-current-duration3': new FormControl('', [Validators.required]),
      'I-current-duration4': new FormControl('', [Validators.required]),
      'I-current-duration5': new FormControl('', [Validators.required]),
      'I-current-amount1': new FormControl('', [Validators.required]),
      'I-current-amount2': new FormControl('', [Validators.required]),
      'I-current-amount3': new FormControl('', [Validators.required]),
      'I-current-amount4': new FormControl('', [Validators.required]),
      'I-current-amount5': new FormControl('', [Validators.required]),
      'I-around-duration1': new FormControl('', [Validators.required]),
      'I-around-duration2': new FormControl('', [Validators.required]),
      'I-around-duration3': new FormControl('', [Validators.required]),
      'I-around-duration4': new FormControl('', [Validators.required]),
      'I-around-duration5': new FormControl('', [Validators.required]),
      'I-around-amount1': new FormControl('', [Validators.required]),
      'I-around-amount2': new FormControl('', [Validators.required]),
      'I-around-amount3': new FormControl('', [Validators.required]),
      'I-around-amount4': new FormControl('', [Validators.required]),
      'I-around-amount5': new FormControl('', [Validators.required]),
      'I-report': new FormControl('', [Validators.required]),
      'I-image': new FormControl('', [Validators.required]),
      'I-subImage1': new FormControl(''),
      'I-subImage2': new FormControl(''),
      'I-subImage3': new FormControl(''),
      'I-subImage4': new FormControl(''),
      'I-subImage5': new FormControl(''),
    });
    this.siteForm = new FormGroup({
      'S-id': new FormControl('', [Validators.required]),
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
      'S-current-duration1': new FormControl('', [Validators.required]),
      'S-current-duration2': new FormControl('', [Validators.required]),
      'S-current-duration3': new FormControl('', [Validators.required]),
      'S-current-duration4': new FormControl('', [Validators.required]),
      'S-current-duration5': new FormControl('', [Validators.required]),
      'S-current-amount1': new FormControl('', [Validators.required]),
      'S-current-amount2': new FormControl('', [Validators.required]),
      'S-current-amount3': new FormControl('', [Validators.required]),
      'S-current-amount4': new FormControl('', [Validators.required]),
      'S-current-amount5': new FormControl('', [Validators.required]),
      'S-around-duration1': new FormControl('', [Validators.required]),
      'S-around-duration2': new FormControl('', [Validators.required]),
      'S-around-duration3': new FormControl('', [Validators.required]),
      'S-around-duration4': new FormControl('', [Validators.required]),
      'S-around-duration5': new FormControl('', [Validators.required]),
      'S-around-amount1': new FormControl('', [Validators.required]),
      'S-around-amount2': new FormControl('', [Validators.required]),
      'S-around-amount3': new FormControl('', [Validators.required]),
      'S-around-amount4': new FormControl('', [Validators.required]),
      'S-around-amount5': new FormControl('', [Validators.required]),
      'S-report': new FormControl('', [Validators.required]),

      'S-image': new FormControl('', [Validators.required]),
      'S-subImage1': new FormControl(''),
      'S-subImage2': new FormControl(''),
      'S-subImage3': new FormControl(''),
      'S-subImage4': new FormControl(''),
      'S-subImage5': new FormControl(''),
    });
    this.newsForm = new FormGroup({
      'N-id': new FormControl('', [Validators.required]),
      // 'N-level': new FormControl('', [Validators.required]),
      'N-notification': new FormControl(''),
      'N-title': new FormControl('', [Validators.required]),
      'N-sub-title': new FormControl('', [Validators.required]),
      'N-sub-description': new FormControl('', [Validators.required]),
      'N-image': new FormControl('', [Validators.required]),
      'N-analysis-title': new FormControl('', [Validators.required]),
      'N-analysis-description': new FormControl('', [Validators.required]),
    });
    this.lawForm = new FormGroup({
      'L-id': new FormControl('', [Validators.required]),
      'L-notification': new FormControl(''),
      'L-title': new FormControl('', [Validators.required]),
      'L-summary': new FormControl('', [Validators.required]),
      'L-file': new FormControl('', [Validators.required]),
      // 'L-file': new FormControl('', [Validators.required]),
    });
    this.meetingForm = new FormGroup({
      'M-id': new FormControl('', [Validators.required]),
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
      this.putData(this.selectedData);
    } else {
      alert('양식이 모두 입력되지 않았습니다.');
    }
  }

  putData(selectedData) {
    console.log('selectedData: ', selectedData);
    this.contentsService.update(selectedData, this.engType[this.selectedData.type])
      .subscribe(
      data => {
        alert((data) ? '컨텐츠가 수정되었습니다.' : '오류가 발생했습니다.');
        this.updateContents(this.selectedData.type);
        console.log(data);
      },
      error => {
        alert('불러오기에 실패하였습니다.');
        console.log('error: ', error);
      }
      );
  }
}
