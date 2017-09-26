import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private loginService: LoginService) { }

    canActivate() {
      var isAuthenticated = this.loginService.isAuthenticated()

        if (isAuthenticated) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
