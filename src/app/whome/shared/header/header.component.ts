import { Component, OnInit } from '@angular/core';
import { String } from 'aws-sdk/clients/ecs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selectedName: String = '부동산 정보';
  menuTree: Array<Object> = [
    {
      'path': 'info',
      'name': '부동산 정보',
      'main': 'recent',
      'sub': [
        {
          'path': 'report',
          'name': '리포트',
        },
        {
          'path': 'news',
          'name': '부동산 뉴스',
        },
        {
          'path': 'law',
          'name': '법률 및 정책'
        },
        {
          'path': 'weekly',
          'name': '주간 순위'
        },
      ]
    },
    {
      'path': 'site',
      'name': '분양 현장',
      'main': 'apartment',
      'sub': [
        {
          'path': 'apartment',
          'name': '아파트'
        },
        {
          'path': 'officetel',
          'name': '오피스텔'
        },
        {
          'path': 'commercial',
          'name': '상가/호텔'
        },
        {
          'path': 'ground',
          'name': '토지'
        }
      ]
    },
    {
      'path': 'recruit',
      'name': '구인 구직',
      'main': 'employer',
      'sub': [
        {
          'path': 'employer',
          'name': '구인'
        },
        {
          'path': 'employee',
          'name': '구직'
        },
        {
          'path': 'apply',
          'name': '등록 요청'
        },
      ],
    },
    {
      'path': 'meeting',
      'name': '오프라인 모임',
      'main': 'meeting'
    },
    {
      'path': 'portfolio',
      'name': '회원 정보',
      'main': 'portfolio'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  viewSubMenu(name, event) {
    this.selectedName = name;
  }

  hideSubMenu(name) {
    this.selectedName = undefined;
  }
}
