/**
 * @file policy.component.ts
 * @author
 * @brief the first page of signup. (/signup/policy)
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  agree1: boolean;
  agree2: boolean;

  constructor(
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit( ) {
  }

  checkAgreement() {
    if (this.agree1 && this.agree2) {
      this.router.navigate(['/signup', 'form']);
    } else {
      this.alertService.warn('약관에 모두 동의하셔야 가입 가능합니다.');
    }
  }
}
