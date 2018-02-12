import { Injectable } from '@angular/core';

@Injectable()
export class PageInfoService {
  route: string;
  dataset: Object = {
    'management': {
      'title': '대쉬보드',
      'dashboard': {
        'title': '대쉬보드'
      },
      'account': {
        'title': '계정관리'
      },
      'contents': {
        'title': '컨텐츠 관리',
        'register': {
          'title': '등록 관리'
        },
        'modify': {
          'title': '수정 관리'
        }
      },
      'analysis': {
        'title': '분석 관리',
        'userAnalysis': {
          'title': '사용자 관리'
        },
        'contentsAnalysis': {
          'title': '컨텐츠 관리'
        }
      }
    }
  };

  constructor() {
  }


  getCurrentData(routePath, data) {
    if (!routePath) return;
    const path = routePath.split('/');
    // console.log('executing...', path, path.length);

    let currentData;

    if (path.length < 2) {
      return 0;
    } else if (path.length === 2) {
      currentData = this.dataset[path[1]];
    } else {
      currentData = this.dataset[path[1]][path[2]];
    }

    try {
      return currentData[data];
    } catch {
      return 0;
    }
  }

}
