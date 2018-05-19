import { Injectable } from '@angular/core';

@Injectable()
export class PageInfoService {
  route: string;
  dataset: Object = {
    'info': {
      'title': '부동산 정보',
      'description': '부동산 정보, 분양 리포트를 한눈에',
      'report': {
        'title': '리포트',
      },
      'news': {
        'title': '부동산 뉴스'
      },
      'law': {
        'title': '법률 및 정책'
      },
      'weekly': {
        'title': '주간 순위'
      }
    },
    'site': {
      'title': '분양 현장',
      'description': '아파트, 오피스텔, 상가에 집중한 분양 정보',
      'apartment': {
        'title': '아파트'
      },
      'officetel': {
        'title': '오피스텔'
      },
      'commercial': {
        'title': '상가/호텔'
      },
      'ground': {
        'title': '토지'
      }
    },
    'recruit': {
      'title': '구인 정보',
      'description': '최적의 사람 찾기',
      'employer': {
        'title': '구인 정보'
      },
      'employee': {
        'title': '구직 정보'
      }
    },
    'meeting': {
      'title': '오프라인 모임',
      'description': '오프라인 모임을 한눈에 보세요!',
    },
    'search': {
      'title': '검색 결과'
    }
  };

  constructor() {
  }


  getCurrentData(routePath, data) {
    if (!routePath) { return; }
    const path = routePath.split('/');
    // console.log('executing...', path, path.length);

    let currentData;

    try {
      if (path.length < 2) {
        return 0;
      } else if (path.length === 2) {
        currentData = this.dataset[path[1]];
      } else {
        currentData = this.dataset[path[1]][path[2]];
      }
      return currentData[data];
    } catch (e) {
      return 0;
    }
  }
}
