import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { LoginService } from '../shared/services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginService],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    email: any;
    password: any;
    logginSpinner = "none"
    submitted = false;

    constructor(public router: Router,private loginService: LoginService) {
    }

    ngOnInit() {
    }

    onLoggedin() {
        this.logginSpinner = "inherit"
        this.loginService.userLogin(this.email, this.password,() => {
            this.logginSpinner = "none"
            this.router.navigateByUrl('/dashboard')
        });
    }

}
