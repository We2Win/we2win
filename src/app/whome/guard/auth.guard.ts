import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(): Observable<boolean> {
        return this.checkLogin();
    }
    canActivateChild(): Observable<boolean> {
        return this.checkLogin();
    }
    // authguard can provide an observable rather than a straight boolean
    checkLogin(): Observable<boolean> {
        return this.authService.checkAuth().map(e => {
            if (e === false) {
                this.router.navigate(['/login']);
                return false;
            }
            return true;
        }).catch(() => {
            console.log('Could not login');
            alert('로그인 후 보실 수 있습니다.');
            this.router.navigate(['/login']);
            return Observable.of(false);
        });
    }
}
