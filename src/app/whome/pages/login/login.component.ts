import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers: [AuthService]
})
export class LoginComponent implements OnInit {
  // we want to actually subscribe to the boolean of the observable
  loginForm: FormGroup;
  post: any;
  private user: User;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = fb.group({
      'ID': [null, Validators.required],
      'Password': [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });

    this.loginForm = new FormGroup({
      ID: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
    });

  }

  onSubmit(user): void {
    if (this.loginForm.valid) {
      this.user = this.loginForm.value;
      this.user.isLogin = true;
      this.authService.login(this.user).subscribe(auth => {
        console.log(auth);
        if (auth) {
          this.router.navigate(['/']);
        }
      });
    } else {
      console.log('loginForm not valid!');
    }
  }
}
