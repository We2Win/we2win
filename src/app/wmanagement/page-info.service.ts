import { Injectable } from '@angular/core';

@Injectable()
export class PageInfoService {
  route: string;
  navTree: Array<Object> = [
    {
      'title': 'dashboard',
      'description': '대쉬보드'
    },
    {
      'title': 'account',
      'description': '계정관리'
    },
    {
      'title': 'contents',
      'description': '컨텐츠관리',
      'children': [
        {
          'title': 'register',
          'description': '등록관리'
        },
        {
          'title': 'modify',
          'description': '수정관리'
        }
      ]
    },
    {
      'title': 'people',
      'description': '구인구직',
      'children': [
        {
          'title': 'employer',
          'description': '구인'
        },
        {
          'title': 'employee',
          'description': '구직'
        }
      ]
    },
    {
      'title': 'analysis',
      'description': '분석관리',
      'children': [
        {
          'title': 'user',
          'description': '사용자관리'
        },
        {
          'title': 'contents',
          'description': '컨텐츠관리'
        }
      ]
    },
    {
      'title': 'tracking',
      'description': '트래킹'
    }
  ];

  constructor() {
  }

  getCurrentData(routePath, data) {
    // console.log(routePath, data);
    if (!routePath) return;
    const path = routePath.split('/');
    // console.log('executing...', path, path.length);

    let currentData;

    try {
      // console.log(path, path.length);
      if (path.length < 3) {
        return 0;
      } else if (path.length === 3) {
        currentData = this.navTree[path[2]];
        // console.log(this.navTree, path[2]);
      } else {
        currentData = this.navTree[path[2]][path[3]];
      }
      return currentData[data];
    } catch (e) {
      return 0;
    }
  }
}
