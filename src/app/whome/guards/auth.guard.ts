/**
 * @file auth.guard.ts
 * @author
 * @brief guard for unauthorized users.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: AuthService,
        private alertService: AlertService
    ) { }

    canActivate() {
        // 토큰 유효 기간 확인
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

    info(message: string) {
        this.alertService.info(message);
    }

    clear() {
        this.alertService.clear();
    }
}
