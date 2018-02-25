import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  // we want to actually subscribe to the boolean of the observable
  onSubmit(form: any): void {
    console.log(form.user);
    this.authService.login(form.user, form.pass).subscribe(auth => {
      if (auth) {
        this.router.navigate(['/info']);
      }
    });
  }
  ngOnInit(): void {
    this.authService.checkAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/info']);
      }
    });
  }
}
