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
import { Report } from '../../../models/report';
import { PutDataService } from '../../../templates/put-data.service';

@Component({
  selector: 'app-contents-modification',
  templateUrl: './contents-modification.component.html',
  styleUrls: [
    './contents-modification.component.css',
    '../../pages.css'
  ],
  providers: [
    ContentsService,
    UploadFileService,
    PutDataService
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

  contentNoArr = [];

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

  @ViewChild('infoDetail') infoDetail;
  @ViewChild('newsDetail') newsDetail;
  @ViewChild('siteDetail') siteDetail;
  @ViewChild('meetingDetail') meetingDetail;
  @ViewChild('employerDetail') employerDetail;
  @ViewChild('employeeDetail') employeeDetail;

  inputs: object;

  uploadedFiles = {
    'master-image': '',
    'slave-image1': '',
    'slave-image2': '',
    'slave-image3': '',
    'slave-image4': '',
    'slave-image5': '',
    'file': '',
  };

  subscription: Subscription;

  templateData = new Report();
  isDataChanged = false;

  // _editor;
  public editor;
  private toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike', { 'color': [] }],        // toggled buttons
    [{ 'align': [] }, { 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    ['blockquote', { 'script': 'sub' }, { 'script': 'super' }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    // { 'header': 1 }, { 'header': 2 }],
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
    private putDataService: PutDataService,
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
        this.siteForm.controls['s-type'].setValue(selected);
        break;
    }

    // tslint:disable-next-line:forin
    for (const i in this.uploadedFiles) {
      this.uploadedFiles[i] = '';
    }
    // tslint:disable-next-line:forin
    for (const i in this.inputs) {
      this.inputs[i] = '기존 파일';
    }
  }

  updateContents(selected) {
    console.log('updateContents(): ', this.engType[selected], selected);
    this.contentsService.getContentsList(this.engType[selected], 'newly', 'date').subscribe(
      data => {
        const titles = [];
        this.contentNoArr = [];

        this.loadedData = data;
        // tslint:disable-next-line:forin
        for (const record in this.loadedData) {
          titles.push(this.loadedData[record]['title']);
          this.contentNoArr.push(this.loadedData[record]['no']);
        }
        if (Object.keys(titles).length !== 0) {
          this.contents.categories['컨텐츠 제목'] = titles;
          this.contents.selected = '컨텐츠 제목';
        } else {
          this.contents.categories['컨텐츠 제목'] = [];
          this.contents.selected = '컨텐츠가 없습니다.';
        }
        // console.log('updated: ', titles);
      },
      error => {
        console.log('error loading contents');
      }
    );
  }

  onContentsChange(num) {
    console.log('onContentsChange(): ', num, this.contentNoArr[num]);
    this.contentsService.getContentsDetail(this.engType[this.selectedData.type], this.contentNoArr[num]).subscribe(
      data => {
        this.loadedData = data;
        console.log('changedData: ', data);

        const form = this.forms[this.selectedData.type];
        // const symbol = form.controls;
        // console.log(symbol);
        // tslint:disable-next-line:forin
        for (const field in form.controls) {
          if (field === 'open-start' || field === 'open-end') {
            form.controls[field].setValue(this.loadedData[field].slice(0, 10));
          } else if (field === 'level') {
            form.controls[field].setValue(this.loadedData[field]);
            console.log('type: ', this.selectedData.type);
            switch (this.selectedData.type) {
              case '리포트':
                this.ILevel.selected = this.loadedData[field];
              break;
              case '부동산 뉴스':
                this.NLevel.selected = this.loadedData[field];
              break;
              case '법률 및 정책':
                this.LLevel.selected = this.loadedData[field];
              break;
              case '아파트':
              case '오피스텔':
              case '상가/호텔':
              case '토지':
                this.SLevel.selected = this.loadedData[field];
              break;
            }
          } else {
            // console.log(this.loadedData[field]);
            form.controls[field].setValue(this.loadedData[field]);
            this.inputs[field.slice(1)] = this.loadedData[field];
          }
        }
      },
      error => {
        console.log('error loading contents');
      }
    );
  }

  onLevelChange(_type) {
    // console.log('_type: ', _type);
    switch (_type) {
      case 'report':
        this.selectBoxData['level'] = this.ILevel.selected;
        break;
      case 'news':
        this.selectBoxData['level'] = this.NLevel.selected;
        break;
      case 'law':
        this.selectBoxData['level'] = this.LLevel.selected;
        break;
      case 'site':
        this.selectBoxData['level'] = this.SLevel.selected;
        break;
    }
  }

  ngOnInit() {
    this.infoForm = new FormGroup({
      'c-id': new FormControl(''),
      'level': new FormControl(''),
      'notification': new FormControl(''),
      'title': new FormControl('', [Validators.required]),
      'summary': new FormControl('', [Validators.required]),
      'open-start': new FormControl('', [Validators.required]),
      'open-end': new FormControl('', [Validators.required]),
      'ammount': new FormControl('', [Validators.required]),
      'manager-name': new FormControl('', [Validators.required]),
      'manager-contact': new FormControl('', [Validators.required]),
      'current-duration1': new FormControl(''),
      'current-duration2': new FormControl(''),
      'current-duration3': new FormControl(''),
      'current-duration4': new FormControl(''),
      'current-duration5': new FormControl(''),
      'current-amount1': new FormControl(''),
      'current-amount2': new FormControl(''),
      'current-amount3': new FormControl(''),
      'current-amount4': new FormControl(''),
      'current-amount5': new FormControl(''),
      'around-duration1': new FormControl(''),
      'around-duration2': new FormControl(''),
      'around-duration3': new FormControl(''),
      'around-duration4': new FormControl(''),
      'around-duration5': new FormControl(''),
      'around-amount1': new FormControl(''),
      'around-amount2': new FormControl(''),
      'around-amount3': new FormControl(''),
      'around-amount4': new FormControl(''),
      'around-amount5': new FormControl(''),
      'report': new FormControl('', [Validators.required]),
      'master-image': new FormControl('', [Validators.required]),
      'slave-image1': new FormControl(''),
      'slave-image2': new FormControl(''),
      'slave-image3': new FormControl(''),
      'slave-image4': new FormControl(''),
      'slave-image5': new FormControl(''),
    });
    this.siteForm = new FormGroup({
      'c-id': new FormControl('', [Validators.required]),
      's-type': new FormControl('', [Validators.required]),
      'level': new FormControl(''),
      'notification': new FormControl(''),
      'title': new FormControl('', [Validators.required]),
      'summary': new FormControl('', [Validators.required]),
      'open-start': new FormControl('', [Validators.required]),
      'open-end': new FormControl('', [Validators.required]),
      'ammount': new FormControl('', [Validators.required]),
      'manager-name': new FormControl('', [Validators.required]),
      'manager-contact': new FormControl('', [Validators.required]),
      'current-duration1': new FormControl(''),
      'current-duration2': new FormControl(''),
      'current-duration3': new FormControl(''),
      'current-duration4': new FormControl(''),
      'current-duration5': new FormControl(''),
      'current-amount1': new FormControl(''),
      'current-amount2': new FormControl(''),
      'current-amount3': new FormControl(''),
      'current-amount4': new FormControl(''),
      'current-amount5': new FormControl(''),
      'around-duration1': new FormControl(''),
      'around-duration2': new FormControl(''),
      'around-duration3': new FormControl(''),
      'around-duration4': new FormControl(''),
      'around-duration5': new FormControl(''),
      'around-amount1': new FormControl(''),
      'around-amount2': new FormControl(''),
      'around-amount3': new FormControl(''),
      'around-amount4': new FormControl(''),
      'around-amount5': new FormControl(''),
      'report': new FormControl('', [Validators.required]),
      'map': new FormControl('', [Validators.required]),
      'master-image': new FormControl('', [Validators.required]),
      'slave-image1': new FormControl(''),
      'slave-image2': new FormControl(''),
      'slave-image3': new FormControl(''),
      'slave-image4': new FormControl(''),
      'slave-image5': new FormControl(''),
    });
    this.newsForm = new FormGroup({
      'level': new FormControl(''),
      'notification': new FormControl(''),
      'title': new FormControl('', [Validators.required]),
      'main-title': new FormControl('', [Validators.required]),
      'main-description': new FormControl('', [Validators.required]),
      'master-image': new FormControl('', [Validators.required]),
      'slave-image1': new FormControl('', [Validators.required]),
      'analysis-title': new FormControl('', [Validators.required]),
      'analysis-description': new FormControl('', [Validators.required]),
    });
    this.lawForm = new FormGroup({
      'level': new FormControl(''),
      'notification': new FormControl(''),
      'title': new FormControl('', [Validators.required]),
      'summary': new FormControl('', [Validators.required]),
      'file': new FormControl('', [Validators.required]),
      // 'file': new FormControl('', [Validators.required]),
    });
    this.meetingForm = new FormGroup({
      'level': new FormControl(''),
      'notification': new FormControl(''),
      'title': new FormControl('', [Validators.required]),
      'summary': new FormControl('', [Validators.required]),
      // 'image': new FormControl('', [Validators.required]),
      'host': new FormControl('', [Validators.required]),
      'apply-start': new FormControl('', [Validators.required]),
      'apply-end': new FormControl('', [Validators.required]),
      'duration-start': new FormControl('', [Validators.required]),
      'duration-end': new FormControl('', [Validators.required]),
      'location': new FormControl('', [Validators.required]),
      'personnel': new FormControl('', [Validators.required]),
      'cost': new FormControl('', [Validators.required]),
      'detail': new FormControl('', [Validators.required]),
      'material': new FormControl('', [Validators.required]),
    });
    this.employerForm = new FormGroup({
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
      'cp': new FormControl('', [Validators.required]),
    });
    this.employeeForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'sex': new FormControl('', [Validators.required]),
      'age-start': new FormControl('', [Validators.required]),
      'age-end': new FormControl('', [Validators.required]),
      'image': new FormControl('', [Validators.required]),
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
      'master-image': '기존 파일',
      'slave-image1': '기존 파일',
      'slave-image2': '기존 파일',
      'slave-image3': '기존 파일',
      'slave-image4': '기존 파일',
      'slave-image5': '기존 파일',
      'file': '기존 파일'
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
          console.log(this.forms[type], columnName);
          this.forms[type].controls[columnName].setValue(name);
          this.inputs[columnName] = name;
          console.log(this.inputs);
          this.uploadedFiles[columnName] = '-done';
          // alert('업로드 되었습니다.');
        }
        );
    } else {
      alert('선택한 파일이 없습니다.');
    }
  }

  uploadFile(type, columnName) {

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

  preview() {
    this.selectedData.body = this.forms[this.selectedData.type].value;
    this.selectedData.body = Object.assign(this.selectedData.body, this.selectBoxData);
    console.log(this.selectedData, this.selectBoxData);

    this.putDataService.updateData(this.selectedData.body);
    // this.templateData = <Report>this.selectedData.body;
    this.isDataChanged = true;
    console.log('this.templateData: ', this.templateData);
  }

  putData(selectedData) {
    console.log('selectedData: ', selectedData);
    this.contentsService.updateContent(this.engType[this.selectedData.type], selectedData)
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
