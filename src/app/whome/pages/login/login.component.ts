import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms/src/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  // we want to actually subscribe to the boolean of the observable
  loginForm: FormGroup;
  ID: FormControl;
  Password: FormControl;

  ngOnInit(): void {
    this.authService.checkAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });

    this.createForm();
    // this.createFormControls();
  }

  createForm() {
    this.loginForm = new FormGroup({
      ID: this.ID,
      Password: this.Password,
    });
  }

  createFormControls() {
    this.ID = new FormControl('', Validators.required);
    this.Password = new FormControl('', [
      Validators.required,
      // Validators.minLength(8)
    ]);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.ID);
      this.authService.login(this.loginForm.ID, this.loginForm.Password).subscribe(auth => {
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
