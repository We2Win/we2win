/**
 * @file policy.component.ts
 * @author
 * @brief the first page of signup. (/signup/policy)
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { ContentsService } from '../../../services/contents.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
  providers: [ContentsService],
})
export class PolicyComponent implements OnInit {
  agree1: boolean;
  agree2: boolean;

  useContent;
  privacyContent;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private contentsService: ContentsService
  ) { }

  ngOnInit( ) {
    this.contentsService.getCompanyInfo('use').subscribe(
      content => {
        console.log(content);
        this.useContent = content.content.contents;
      }
    );
    this.contentsService.getCompanyInfo('privacy').subscribe(
      content => {
        console.log(content);
        this.privacyContent = content.content.contents;
      }
    );
  }

  checkAgreement() {
    if (this.agree1 && this.agree2) {
      this.router.navigate(['/signup', 'form']);
    } else {
      this.alertService.warn('약관에 모두 동의하셔야 가입 가능합니다.');
    }
  }
}
