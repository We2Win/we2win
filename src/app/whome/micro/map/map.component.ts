import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  isLoaded = false;
  @Input('address')
  set address(value: string) {
    console.log('value: ', value, this.isLoaded);
    if (value && !this.isLoaded) {
      this.setMap(value);
      this.isLoaded = true;
    }
  }

  constructor() { }

  ngOnInit() {

  }

  setMap(address) {
    try {
      const map = new window['naver'].maps.Map('map');
      const myaddress = address;
      window['naver'].maps.Service.geocode({ address: myaddress }, function (status, response) {
        if (status !== window['naver'].maps.Service.Status.OK) {
          return alert(myaddress + '의 검색 결과가 없거나 기타 네트워크 에러');
        }
        const result = response.result;
        // 검색 결과 갯수: result.total
        // 첫번째 결과 결과 주소: result.items[0].address
        // 첫번째 검색 결과 좌표: result.items[0].point.y, result.items[0].point.x
        const myaddr = new window['naver'].maps.Point(result.items[0].point.x, result.items[0].point.y);
        map.setCenter(myaddr); // 검색된 좌표로 지도 이동
        // 마커 표시
        const marker = new window['naver'].maps.Marker({
          position: myaddr,
          map: map
        });
        // // 마커 클릭 이벤트 처리
        // window['naver'].maps.Event.addListener(marker, 'click', function (e) {
        //   if (infowindow.getMap()) {
        //     infowindow.close();
        //   } else {
        //     infowindow.open(map, marker);
        //   }
        // });
        // // 마크 클릭시 인포윈도우 오픈
        // const infowindow = new window['naver'].maps.InfoWindow({
        //   content: '<h4> [네이버 개발자센터]</h4><a href="https://developers.naver.com" target="_blank"><img src="https://developers.naver.com/inc/devcenter/images/nd_img.png"></a>'
        // });
      });
    } catch (error) {
    }
  }

}
