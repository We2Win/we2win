import { Component, OnInit, ViewChild, Renderer, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  loadAPI: Promise<any>;

  signupForm: FormGroup;
  private user: any;
  zonecode = '우편번호'; // 5자리 새우편번호 사용
  fullRoadAddr = '도로명주소';
  jibunAddress = '지번주소';

  loginType = '';
  ULevel;
  ULevelName = ['GUEST', 'STANDARD', 'PREMIUM', 'PLATINUM'];
  ULevelPrice = [0, 0, 5000, 10000];

  checkId: boolean;

  @ViewChild('ID') ID;
  @ViewChild('Password') Password;
  @ViewChild('PasswordV') PasswordV;
  @ViewChild('Name') Name;
  @ViewChild('Email') Email;
  @ViewChild('AAmount') AAmount;
  @ViewChild('Location1') Location1;
  @ViewChild('Location2') Location2;
  @ViewChild('Amount') Amount;

  phone;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private renderer: Renderer,
    private elementRef: ElementRef
  ) {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }

  public loadScript() {
    let isFound = false;
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
        isFound = true;
      }
    }

    if (!isFound) {
      const dynamicScripts = ['http://developers.kakao.com/sdk/js/kakao.min.js'];

      for (let i = 0; i < dynamicScripts.length; i++) {
        const node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }
    }
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      ID: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
      // PW: new FormGroup({
      Password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      PasswordV: new FormControl(),
      // confirmPassword: new FormControl(),
      // }),
      Name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      CP: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
      ULevel: new FormControl(),
      // UPoint: new FormControl(),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Hope: new FormControl(),
      Site: new FormControl(),
      // Location1: new FormControl(),
      // Location2: new FormControl(),
      // Amount: new FormControl(),
      HA: new FormControl(),
      HP: new FormControl(),
      OA: new FormControl(),
      OP: new FormControl(),
      InfoA: new FormControl(),
      // AAmount: new FormControl(),
      ASns: new FormControl(),
      UWord: new FormControl(),
    });

    const Naver = new naver.LoginWithNaverId(
      {
        clientId: environment.naver.clientId,
        callbackUrl: environment.naver.callbackUrl,
        isPopup: false, /* 팝업을 통한 연동처리 여부 */
        loginButton: { color: 'green', type: 3, height: 54.59 } /* 로그인 버튼의 타입을 지정 */
      }
    );

    /* 설정정보를 초기화하고 연동을 준비 */
    // Naver.init();
    // Kakao.init('b560ff0ff0ea7935612a6555fb53c516');
    window['IMP'].init('imp78270348');
  }

  onSubmit() {
    // check id validation
    if (this.checkId === undefined) {
      alert('아이디 확인을 해주세요.');
      return false;
    } else if (this.checkId === false) {
      alert('중복된 아이디가 존재하거나 아이디 확인을 하지 않으셨습니다.');
      return false;
    }

    // check password validation
    if (this.signupForm.controls['Password'].value !== this.signupForm.controls['PasswordV'].value) {
      alert('비밀번호를 확인해주세요.');
      scroll(0, 200);
      return false;
    }
    if (!this.signupForm.valid) {
      alert('기본 정보는 필수사항입니다.');
      scroll(0, 200);
      return false;
    }

    // this.setSelectValue();
    // this.user = this.signupForm.value;
    this.user = {
      'ID': this.signupForm.controls['ID'].value,
      'Password': this.signupForm.controls['Password'].value,
      'Name': this.signupForm.controls['Name'].value,
      'CP': this.signupForm.controls['CP'].value,
      'U-level': this.ULevel,
      'Email': this.signupForm.controls['Email'].value,
      'Hope': this.signupForm.controls['Hope'].value,
      'Site': this.signupForm.controls['Site'].value,
      'Location1': this.Location1.selected,
      'Location2': this.Location2.selected,
      'Amount': this.Amount.selected,
      'HA': this.signupForm.controls['HA'].value,
      'HP': this.signupForm.controls['HP'].value,
      'OA': this.signupForm.controls['OA'].value,
      'OP': this.signupForm.controls['OP'].value,
      'Info-a': this.signupForm.controls['InfoA'].value,
      // tslint:disable-next-line:radix
      'A-amount': parseInt(this.AAmount.selected),
    };
    console.log(this.user);

    if (this.user['U-level'] === 1) {
      this.createUser(this.user);
    } else {
      this.payFee(this.user);
    }
  }

  createUser(userInfo) {
    this.userService.create(this.user)
      .subscribe(
      data => {
        console.log('data: ', data);
        this.router.navigate(['signup', 'done']);
      },
      error => {
        alert('회원 가입중 문제가 발생했습니다.');
        console.log('error: ', error);
      }
      );
  }

  payFee(userInfo) {
    // IMP.request_pay(param, callback) 호출
    window['IMP'].request_pay({ // param
      pg: 'kcp',
      pay_method: 'card',
      merchant_uid: 'WE' + new Date(),
      name: '회원등급' + this.ULevelName[userInfo['U-level']],
      amount: this.ULevelPrice[userInfo['U-level']],
      buyer_email: userInfo['Email'],
      buyer_name: userInfo['Name'],
      buyer_tel: userInfo['CP'],
      buyer_addr: userInfo['Address'],
      // buyer_postcode: userInfo.
    }, (rsp) => { // callback
      if (rsp.success) {
        // alert('success!');
        const now = new Date();
        let current;
        if (now.getMonth() === 11) {
          current = new Date(now.getFullYear() + 1, 0, 1);
        } else {
          current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        }
        userInfo['U-level-start'] = now;
        userInfo['U-level-end'] = current;
      } else {
        alert('failed...');
        console.log(rsp);
      }
    });
  }

  setSelectValue() {
    this.signupForm.addControl('AAmount', new FormControl(this.AAmount.selected));
    this.signupForm.addControl('Amount', new FormControl(this.Amount.selected));
    this.signupForm.addControl('Location1', new FormControl(this.Location1.selected));
    this.signupForm.addControl('Location2', new FormControl(this.Location2.selected));
  }

  hasId(e) {
    e.stopPropagation();

    const checkValue = this.signupForm.controls['ID'].hasError('minlength')
      || this.signupForm.controls['ID'].hasError('maxlength')
      || this.signupForm.controls['ID'].hasError('required');
    if (checkValue) {
      alert('4글자 ~ 15글자 이내로 아이디를 적어주세요.');
      return false;
    }

    const userInfo = {
      ID: this.signupForm.controls['ID'].value
    };
    // this.userService.hasId(userInfo);
    this.userService.hasId(userInfo)
      .subscribe(
      data => {
        if (data) {
          this.checkId = true;
          alert('사용가능한 ID입니다.');
        } else {
          this.checkId = false;
          alert('이미 존재하는 ID입니다.');
        }
      },
      error => {
        // console.log('error: ', error);
        alert('오류가 발생했습니다.');
      }
      );
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
      } else if (type === 'naverSample') {
        alert('네이버 아이디로 로그인 팝업');
        this.signupForm.controls['ID'].setValue('NAVER_ID');
        this.signupForm.controls['Password'].setValue('NAVER_Password');
        this.signupForm.controls['PasswordV'].setValue('NAVER_Password');
        this.signupForm.controls['Name'].setValue('NAVER_Name');
        this.signupForm.controls['Email'].setValue('NAVER_Email');

        this.ID.nativeElement.classList.add('disable');
        this.Password.nativeElement.classList.add('disable');
        this.PasswordV.nativeElement.classList.add('disable');
        this.Name.nativeElement.classList.add('disable');
        this.Email.nativeElement.classList.add('disable');
      } else if (type === 'kakaoSample') {
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

  loginWithKakao() {
    console.log('initiated');
    // 로그인 창을 띄웁니다.
    window['Kakao'].Auth.login({
      success: function (authObj) {
        alert(JSON.stringify(authObj));
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      }
    });
  }

  setLevel(level) {
    this.ULevel = level;
  }

  setLevelOnKeyDown(level, event) {
    if (event.keyCode === 0 || event.keyCode === 32 || event.keyCode === 13) {
      event.preventDefault();
      this.setLevel(level);
    }
  }

  setHyphen(input) {
    if (input === 'CP') {
      let str = this.signupForm.controls['CP'].value.replace(/\-/g, '');
      console.log(str);
      if (str.length === 11) {
        str = str.substring(0, 3) + '-' + str.substring(3, 7) + '-' + str.substring(7, str.length);
      } else if (str.length === 10) {
        str = str.substring(0, 3) + '-' + str.substring(3, 6) + '-' + str.substring(6, str.length);
      }
      this.signupForm.controls['CP'].setValue(str);
    }
  }

  // 본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
  execDaumPostcode() {
    const Daum = new window['daum'].Postcode({
      oncomplete: (data) => {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        let fullRoadAddr = data.roadAddress; // 도로명 주소 변수
        let extraRoadAddr = ''; // 도로명 조합형 주소 변수

        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraRoadAddr !== '') {
          extraRoadAddr = ' (' + extraRoadAddr + ')';
        }
        // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
        if (fullRoadAddr !== '') {
          fullRoadAddr += extraRoadAddr;
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        this.zonecode = data.zonecode; // 5자리 새우편번호 사용
        this.fullRoadAddr = data.roadAddress;
        this.jibunAddress = data.jibunAddress;
        this.signupForm.controls['HA'].setValue(this.fullRoadAddr);

        console.log(this.zonecode, this.fullRoadAddr, this.jibunAddress);

        return;
        // // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
        // if (data.autoRoadAddress) {
        //   //예상되는 도로명 주소에 조합형 주소를 추가한다.
        //   var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
        //   document.getElementById('guide').innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';

        // } else if (data.autoJibunAddress) {
        //   var expJibunAddr = data.autoJibunAddress;
        //   document.getElementById('guide').innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';

        // } else {
        //   document.getElementById('guide').innerHTML = '';
        // }
      }
    }).open();
  }

  selectLoginType($event) {
    console.log($event);
  }
}
