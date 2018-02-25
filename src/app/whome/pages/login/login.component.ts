import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  // we want to actually subscribe to the boolean of the observable
  onSubmit(form: any): void {
    console.log(form.user);
    this.authService.login(form.user, form.pass).subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }
  ngOnInit(): void {
    this.authService.checkAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }
}
