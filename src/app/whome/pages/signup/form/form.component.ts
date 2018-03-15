import { Component, OnInit, ViewChild, Renderer, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

// declare let addressAPI: any;

// addressAPI.import('http://dmaps.daum.net/map_js_init/postcode.v2.js')
//   .then(xJS => {
//     // xJS.open();
//   });

// declare var daum: any;/

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  signupForm: FormGroup;
  private user: User;
  zonecode; // 5자리 새우편번호 사용
  fullRoadAddr;
  jibunAddress;

  loginType = '';
  ULevel;

  @ViewChild('ID') ID;
  @ViewChild('Password') Password;
  @ViewChild('PasswordV') PasswordV;
  @ViewChild('Name') Name;
  @ViewChild('Email') Email;
  @ViewChild('AAmount') AAmount;
  @ViewChild('Location1') Location1;
  @ViewChild('Location2') Location2;
  @ViewChild('Amount') Amount;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private renderer: Renderer,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      ID: new FormControl('', [Validators.required, Validators.minLength(4)]),
      // PW: new FormGroup({
      Password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      PasswordV: new FormControl(),
      // confirmPassword: new FormControl(),
      // }),
      Name: new FormControl(),
      CP: new FormControl(),
      ULevel: new FormControl(),
      UPoint: new FormControl(),
      Email: new FormControl(),
      Hope: new FormControl(),
      Site: new FormControl(),
      // Location: new FormControl(),
      // Amount: new FormControl(),
      OP: new FormControl(),
      HP: new FormControl(),
      OA: new FormControl(),
      HA: new FormControl(),
      InfoA: new FormControl(),
      // AAmount: new FormControl(),
      ASns: new FormControl(),
      UWord: new FormControl(),
    });
    this.ULevel = this.signupForm.controls['ULevel'];

    const Naver = new naver.LoginWithNaverId(
      {
        clientId: environment.naver.clientId,
        callbackUrl: environment.naver.callbackUrl,
        isPopup: false, /* 팝업을 통한 연동처리 여부 */
        loginButton: { color: 'green', type: 3, height: 54.59 } /* 로그인 버튼의 타입을 지정 */
      }
    );

    /* 설정정보를 초기화하고 연동을 준비 */
    Naver.init();
  }

  onSubmit() {
    this.setSelectValue();
    if (this.signupForm.valid) {
      this.user = this.signupForm.value;
      console.log(JSON.stringify(this.user));
      this.userService.create(this.user)
        // this.userService.try()
        .subscribe(
        data => {
          this.router.navigate(['signup', 'done']);
        },
        error => {
          alert('회원 가입중 문제가 발생했습니다.');
          console.log('error: ', error);
        }
        );
    } else {
      alert('기본 정보는 필수사항입니다.');
      scroll(0, 200);
    }
  }

  setSelectValue() {
    this.signupForm.addControl('AAmount', new FormControl(this.AAmount.selected));
    this.signupForm.addControl('Amount', new FormControl(this.Amount.selected));
    this.signupForm.addControl('Location1', new FormControl(this.Location1.selected));
    this.signupForm.addControl('Location2', new FormControl(this.Location2.selected));
  }

  hasId(e) {
    console.log('ID: ', this.ID);
    e.stopPropagation();
    const userInfo = {
      ID: this.ID.value
    };
    console.log('hasId(): ', this.userService.hasId(userInfo));
  }

  setLoginType(type) {
    if (this.loginType) {
      if (confirm('로그인 방식을 변경하시겠습니까?')) {

      } else {
        return;
      }
    }

    if (type) {
      this.loginType = type;

      // sample code
      if (type === 'naver') {
        this.loginWithNaver();
        // alert('네이버 아이디로 로그인 팝업');
        this.signupForm.controls['ID'].setValue('NAVER_ID');
        this.signupForm.controls['Password'].setValue('NAVER_Password');
        this.signupForm.controls['Name'].setValue('NAVER_Name');
        this.signupForm.controls['Email'].setValue('NAVER_Email');

        this.ID.nativeElement.classList.add('disable');
        this.Password.nativeElement.classList.add('disable');
        this.Name.nativeElement.classList.add('disable');
        this.Email.nativeElement.classList.add('disable');
      } else if (type === 'kakao') {
        alert('카카오 아이디로 로그인 팝업');
        this.signupForm.controls['ID'].setValue('KAKAO_ID');
        this.signupForm.controls['Password'].setValue('KAKAO_Password');
        this.signupForm.controls['PasswordV'].setValue('KAKAO_Password');
        this.signupForm.controls['Name'].setValue('KAKAO_Name');
        this.signupForm.controls['Email'].setValue('KAKAO_Email');

        this.ID.nativeElement.classList.add('disable');
        this.PasswordV.nativeElement.classList.add('disable');
        this.Password.nativeElement.classList.add('disable');
        this.Name.nativeElement.classList.add('disable');
        this.Email.nativeElement.classList.add('disable');
      } else {
        this.signupForm.reset();

        this.ID.nativeElement.classList.remove('disable');
        this.Password.nativeElement.classList.remove('disable');
        this.PasswordV.nativeElement.classList.remove('disable');
        this.Name.nativeElement.classList.remove('disable');
        this.Email.nativeElement.classList.remove('disable');
      }
    }
  }

  loginWithNaver() {
    const root = this.renderer.selectRootElement(this.elementRef.nativeElement);
    const naverLogin = new root.naver.LoginWithNaverId(
      {
        clientId: environment.naver.clientId,
        callbackUrl: environment.naver.callbackUrl,
        isPopup: false, /* 팝업을 통한 연동처리 여부 */
        loginButton: { color: 'green', type: 3, height: 60 } /* 로그인 버튼의 타입을 지정 */
      }
    );

    /* 설정정보를 초기화하고 연동을 준비 */
    naverLogin.init();
  }

  setLevel(level) {
    this.signupForm.controls['ULevel'].setValue(level);
    console.log(this.signupForm.controls['ULevel'].value);
  }

  setLevelOnKeyDown(level, event) {
    if (event.keyCode === 0 || event.keyCode === 32 || event.keyCode === 13) {
      event.preventDefault();
      this.setLevel(level);
    }
  }

  // 본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
  execDaumPostcode() {
    const Daum = new daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
        // 예제를 참고하여 다양한 활용법을 확인해 보세요.
        console.log('주소데이터: ', data);
      }
    }).open();
    // // const root = this.renderer.selectRootElement(this.elementRef.nativeElement);
    // const Daum = new daum.Postcode({
    //   oncomplete: function (data) {
    //     // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

    //     // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
    //     // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
    //     let fullRoadAddr = data.roadAddress; // 도로명 주소 변수
    //     let extraRoadAddr = ''; // 도로명 조합형 주소 변수

    //     // 법정동명이 있을 경우 추가한다. (법정리는 제외)
    //     // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
    //     if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
    //       extraRoadAddr += data.bname;
    //     }
    //     // 건물명이 있고, 공동주택일 경우 추가한다.
    //     if (data.buildingName !== '' && data.apartment === 'Y') {
    //       extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
    //     }
    //     // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
    //     if (extraRoadAddr !== '') {
    //       extraRoadAddr = ' (' + extraRoadAddr + ')';
    //     }
    //     // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
    //     if (fullRoadAddr !== '') {
    //       fullRoadAddr += extraRoadAddr;
    //     }

    //     // 우편번호와 주소 정보를 해당 필드에 넣는다.
    //     this.zonecode = data.zonecode; // 5자리 새우편번호 사용
    //     this.fullRoadAddr = fullRoadAddr;
    //     this.jibunAddress = data.jibunAddress;

    //     // // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
    //     // if (data.autoRoadAddress) {
    //     //   //예상되는 도로명 주소에 조합형 주소를 추가한다.
    //     //   var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
    //     //   document.getElementById('guide').innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';

    //     // } else if (data.autoJibunAddress) {
    //     //   var expJibunAddr = data.autoJibunAddress;
    //     //   document.getElementById('guide').innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';

    //     // } else {
    //     //   document.getElementById('guide').innerHTML = '';
    //     // }
    //   }
    // }).open();
  }

  selectLoginType($event) {
    console.log($event);
  }
}
