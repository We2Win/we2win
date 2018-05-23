import { Component, OnInit, AfterViewInit, ViewChild, Renderer, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { AlertService } from '../../../services/alert.service';
import { setInterval } from 'timers';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, AfterViewInit {
  loadAPI: Promise<any>;

  signupForm: FormGroup;
  private user: any;
  zonecode = '우편번호'; // 5자리 새우편번호 사용
  fullRoadAddr = '도로명주소';
  jibunAddress = '지번주소';

  loginType = '';
  level;
  levelName = ['GUEST', 'STANDARD', 'PREMIUM', 'PLATINUM'];
  levelPrice = {
    'GUEST': 0,
    'STANDARD': 0,
    'PREMIUM': 5000,
    'PLATINUM': 10000
  };

  checkId: boolean;

  @ViewChild('uId') uId;
  @ViewChild('password') password;
  @ViewChild('passwordV') passwordV;
  @ViewChild('name') name;
  @ViewChild('email') email;
  @ViewChild('asset') asset;
  @ViewChild('location1') location1;
  @ViewChild('location2') location2;
  @ViewChild('amount') amount;

  @ViewChild('naverButton') naverButton;

  phone;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
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
      'u-id': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
      // PW: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      passwordV: new FormControl(),
      // confirmPassword: new FormControl(),
      // }),
      name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      cp: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
      level: new FormControl(),
      // UPoint: new FormControl(),
      email: new FormControl('', [Validators.required, Validators.email]),
      hope: new FormControl(),
      site: new FormControl(),
      // Location1: new FormControl(),
      // Location2: new FormControl(),
      // Amount: new FormControl(),
      ha: new FormControl(),
      hp: new FormControl(),
      oa: new FormControl(),
      op: new FormControl(),
      'info-a': new FormControl(),
      // AAmount: new FormControl(),
      sns: new FormControl(),
      keyword: new FormControl(),
    });

    window['IMP'].init('imp78270348');

    if (!window['Kakao'].Auth) {
      window['Kakao'].init(environment.kakao.clientId);
      console.log('Kakao auth started');
    }
  }

  ngAfterViewInit() {
    const Naver = new naver.LoginWithNaverId(
      {
        clientId: environment.naver.clientId,
        isPopup: true, /* 팝업을 통한 연동처리 여부 */
        callbackHandle: false,
        callbackUrl: environment.naver.registerUrl,
        loginButton: { color: 'green', type: 3, height: 48 } /* 로그인 버튼의 타입을 지정 */
      }
    );

    /* 설정정보를 초기화하고 연동을 준비 */
    // Naver.init();

    this.elementRef.nativeElement.querySelector('#naverIdLogin a').setAttribute('onclick', 'return false;');

    window.addEventListener('load', function () {
      Naver.getLoginStatus(function (status) {
        console.log('status of Naver: ', status);
        if (status) {
          /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
          const email = Naver.user.getEmail();
          if (email == undefined || email == null) {
            alert('이메일은 필수정보입니다. 정보제공을 동의해주세요.');
            /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
            Naver.reprompt();
            return;
          }


          this.loginType = 'kakao';
          this.checkId = true;

          this.signupForm.controls['u-id'].setValue('n_' + Naver.user.getId());
          this.signupForm.controls['password'].setValue('KAKAO1234!');
          this.signupForm.controls['passwordV'].setValue('KAKAO1234!');
          this.signupForm.controls['name'].setValue(Naver.user.getNickName());
          this.signupForm.controls['email'].setValue(Naver.user.getEmail());

          this.uId.nativeElement.setAttribute('readonly', true);
          this.password.nativeElement.setAttribute('readonly', true);
          this.passwordV.nativeElement.setAttribute('readonly', true);
          this.name.nativeElement.setAttribute('readonly', true);
          this.email.nativeElement.setAttribute('readonly', true);
          alert('done');
        } else {
          console.log('callback 처리에 실패하였습니다.');
        }
      });
    });

    // setInterval(() => {
    //   console.log('naver: ', Naver.getLoginStatus(
    //   status => {
    //     console.log('status: ', status);
    //   }));
    // }, 2000);
  }


  onSubmit() {
    // check id validation
    if (this.checkId === undefined) {
      this.alertService.error('아이디 확인을 해주세요.');
      return false;
    } else if (this.checkId === false) {
      this.alertService.error('중복된 아이디가 존재하거나 아이디 확인을 하지 않으셨습니다.');
      return false;
    }

    // check password validation
    if (this.signupForm.controls['password'].value !== this.signupForm.controls['passwordV'].value) {
      this.alertService.error('비밀번호를 확인해주세요.');
      scroll(0, 200);
      return false;
    }
    if (!this.signupForm.valid) {
      this.alertService.error('필수항목(기본정보)를 모두 입력해주세요.');
      scroll(0, 200);
      return false;
    }

    // this.setSelectValue();
    // this.user = this.signupForm.value;
    console.log('testing');
    this.user = {
      'u-id': this.signupForm.controls['u-id'].value,
      'password': this.signupForm.controls['password'].value,
      'name': this.signupForm.controls['name'].value,
      'cp': this.signupForm.controls['cp'].value,
      'level': this.level,
      'email': this.signupForm.controls['email'].value,
      'hope': this.signupForm.controls['hope'].value,
      'site': this.signupForm.controls['site'].value,
      'location1': this.location1.selected,
      'location2': this.location2.selected,
      'amount': this.amount.selected,
      'ha': this.signupForm.controls['ha'].value,
      'hp': this.signupForm.controls['hp'].value,
      'oa': this.signupForm.controls['oa'].value,
      'op': this.signupForm.controls['op'].value,
      'info-a': this.signupForm.controls['info-a'].value,
      // tslint:disable-next-line:radix
      'asset': parseInt(this.asset.selected),
    };
    console.log(this.user);

    if (this.user['level'] === 'STANDARD') {
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
        if (data.success) {
          this.router.navigate(['signup', 'done']);
        } else {
          this.alertService.error(data.error);
        }
      },
      error => {
        this.alertService.error('회원 가입중 문제가 발생했습니다.');
        console.log('error: ', error);
      }
      );
  }

  payFee(userInfo) {
    // IMP.request_pay(param, callback) 호출
    console.log(userInfo);
    window['IMP'].request_pay({ // param
      pg: 'kcp',
      pay_method: 'card',
      merchant_uid: 'WE' + new Date(),
      name: '회원등급' + userInfo['level'],
      amount: this.levelPrice[userInfo['level']],
      buyer_email: userInfo['email'],
      buyer_name: userInfo['name'],
      buyer_tel: userInfo['cp'],
      buyer_addr: userInfo['ha'],
      // buyer_postcode: userInfo.
    }, (rsp) => { // callback
      if (rsp.success) {
        // this.info('success!');
        const now = new Date();
        let current;
        if (now.getMonth() === 11) {
          current = new Date(now.getFullYear() + 1, 0, 1);
        } else {
          current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        }
        userInfo['level-start'] = now;
        userInfo['level-end'] = current;
      } else {
        this.alertService.info('failed...');
        console.log(rsp);
      }
    });
  }

  setSelectValue() {
    this.signupForm.addControl('asset', new FormControl(this.asset.selected));
    this.signupForm.addControl('amount', new FormControl(this.amount.selected));
    this.signupForm.addControl('location1', new FormControl(this.location1.selected));
    this.signupForm.addControl('location2', new FormControl(this.location2.selected));
  }

  hasId(e) {
    e.stopPropagation();

    const checkValue = this.signupForm.controls['u-id'].hasError('minlength')
      || this.signupForm.controls['u-id'].hasError('maxlength')
      || this.signupForm.controls['u-id'].hasError('required');

    if (checkValue) {
      this.alertService.info('4글자 ~ 15글자 이내로 적어주세요.');
      return false;
    }

    const userInfo = {
      'u-id': this.signupForm.controls['u-id'].value
    };
    // this.userService.hasId(userInfo);
    this.userService.hasId(userInfo)
      .subscribe(
      data => {
        if (data) {
          this.checkId = true;
          this.alertService.info('사용가능한 ID입니다.');
        } else {
          this.checkId = false;
          this.alertService.warn('이미 존재하는 ID입니다.');
        }
      },
      error => {
        // console.log('error: ', error);
        this.alertService.error('오류가 발생했습니다.');
      }
      );
  }

  setLoginType(type) {
    if (this.loginType) {
      if (!confirm('로그인 방식을 변경하시겠습니까?')) {
        return;
      }
    }

    if (type) {
      // this.loginType = type;
      // sample code
      if (type === 'naver') {
        this.uId.nativeElement.setAttribute('readonly', true);
        this.password.nativeElement.setAttribute('readonly', true);
        this.passwordV.nativeElement.setAttribute('readonly', true);
        this.name.nativeElement.setAttribute('readonly', true);
        this.email.nativeElement.setAttribute('readonly', true);
      } else if (type === 'kakao') {
        this.loginWithKakao();
      } else {
        this.signupForm.reset();

        this.uId.nativeElement.setAttribute('readonly', false);
        this.password.nativeElement.setAttribute('readonly', false);
        this.passwordV.nativeElement.setAttribute('readonly', false);
        this.name.nativeElement.setAttribute('readonly', false);
        this.email.nativeElement.setAttribute('readonly', false);
      }
    }
  }

  loginWithNaver() {
    window.addEventListener('load', () => {
      window['naver'].getLoginStatus((status) => {
        console.log('naver status: ', status);
        if (status) {
          this.loginType = 'naver';
          /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
          const uId = window['naver'].user.getEmail();
          const email = window['naver'].user.getEmail();
          const name = window['naver'].user.getNickName();
          this.signupForm.controls['u-id'].setValue(window['naver'].user.getEmail());
          this.signupForm.controls['email'].setValue(window['naver'].user.getEmail());
          this.signupForm.controls['name'].setValue(window['naver'].user.getNickName());
          this.signupForm.controls['password'].setValue('naver0123!');
          // console.log('email: ', email);
          if (email == undefined || email == null) {
            alert('이메일은 필수정보입니다. 정보제공을 동의해주세요.');
            /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
            window['naver'].reprompt();
            return;
          }

          // window.location.replace();
        } else {
          console.log('callback 처리에 실패하였습니다.');
        }
      });
    });
  }

  loginWithKakao() {
    console.log('initiated');
    // 로그인 창을 띄웁니다.
    window['Kakao'].Auth.login({
      success: authObj => {
        window['Kakao'].API.request({
          url: '/v1/user/me',
          success: authInfo => {
            console.log('authInfo: ', authInfo);
            this.loginType = 'kakao';
            this.checkId = true;

            this.signupForm.controls['u-id'].setValue('k_' + authInfo.id);
            this.signupForm.controls['password'].setValue('KAKAO1234!');
            this.signupForm.controls['passwordV'].setValue('KAKAO1234!');
            this.signupForm.controls['name'].setValue(authInfo.properties.nickname);
            this.signupForm.controls['email'].setValue(authInfo.kaccount_email);

            this.uId.nativeElement.setAttribute('readonly', true);
            this.password.nativeElement.setAttribute('readonly', true);
            this.passwordV.nativeElement.setAttribute('readonly', true);
            this.name.nativeElement.setAttribute('readonly', true);
            this.email.nativeElement.setAttribute('readonly', true);
          },
          fail: function (error) {
            this.alertService.error('카카오 계정 정보 불러오기에 실패하였습니다.');
          }
        });



        // this.signupForm.controls['u-id'].setValue('K' + new Date().toISOString().replace(/-/g, '').slice(2, 17));
        // this.signupForm.controls['password'].setValue('kakao1234!');
      },
      fail: (err) => {
        this.alertService.error('카카오 계정 인증에 실패하였습니다.');
      }
    });
  }

  setLevel(level) {
    const levelName = ['STANDARD', 'PREMIUM', 'PLATINUM'];
    this.level = levelName[level - 1];
  }

  setLevelOnKeyDown(level, event) {
    if (event.keyCode === 0 || event.keyCode === 32 || event.keyCode === 13) {
      event.preventDefault();
      this.setLevel(level);
    }
  }

  setHyphen(input) {
    if (input === 'cp') {
      let str = this.signupForm.controls['cp'].value.replace(/\-/g, '');
      console.log(str);
      if (str.length === 11) {
        str = str.substring(0, 3) + '-' + str.substring(3, 7) + '-' + str.substring(7, str.length);
      } else if (str.length === 10) {
        str = str.substring(0, 3) + '-' + str.substring(3, 6) + '-' + str.substring(6, str.length);
      }
      this.signupForm.controls['cp'].setValue(str);
    }
  }

  // 본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
  execDaumPostcode(type) {
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
        // this.zonecode = data.zonecode; // 5자리 새우편번호 사용
        // this.fullRoadAddr = data.roadAddress;
        // this.jibunAddress = data.jibunAddress;
        this.signupForm.controls[type].setValue(data.roadAddress + ' (' + data.zonecode + ')');

        // console.log(this.zonecode, this.fullRoadAddr, this.jibunAddress);

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
