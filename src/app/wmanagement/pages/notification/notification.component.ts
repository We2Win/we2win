import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContentsService } from '../../services/contents.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: [
    './notification.component.css',
    '../pages.css'
  ]
})
export class NotificationComponent implements OnInit {
  useForm: FormGroup;
  privacyForm: FormGroup;

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

  constructor(
    private fb: FormBuilder,
    private contentsService: ContentsService,
    private http: HttpClient,
    private elementRef: ElementRef,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.useForm = new FormGroup({
      'content': new FormControl('')
    });
    this.privacyForm = new FormGroup({
      'content': new FormControl('')
    });
  }

  onSubmitUse() {
    console.log(this.useForm.value);
    this.contentsService.updateCompanyInfo('use', this.useForm.value)
      .subscribe(
        data => {
          this.alertService.info((data) ? '컨텐츠가 수정되었습니다.' : '오류가 발생했습니다.');
          console.log('data: ', data);
        },
        error => {
          this.alertService.error('불러오기에 실패하였습니다.');
        }
      );
  }

  onSubmitPrivacy() {
    console.log(this.privacyForm.value);
    this.contentsService.updateCompanyInfo('privacy', this.privacyForm.value)
      .subscribe(
      data => {
        this.alertService.info((data) ? '컨텐츠가 수정되었습니다.' : '오류가 발생했습니다.');
        console.log('data: ', data);
      },
      error => {
        this.alertService.error('불러오기에 실패하였습니다.');
      }
      );
  }
}
