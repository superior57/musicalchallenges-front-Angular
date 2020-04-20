
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../userservice/user.service';
import { MessageService } from '../userservice/message.services';
import { Http } from "@angular/http";

export class ForgotPasswordData {
    id: string;
    password: string;
    repassword: string;
}

@Component({
    selector: 'forgotpassword',
    styleUrls: ['./forgotpassword.component.css'],
    templateUrl: './forgotpassword.component.html'
})
export class ForgotpasswordComponent implements OnInit {

    forgotPasswordData: ForgotPasswordData;

    constructor(private http: Http,
        private _appservice: UserService,
        private _message: MessageService,
        private activatedRoute: ActivatedRoute,
        private _router: Router
    ) {

    }
    ngOnInit(): void {
        this.forgotPasswordData = {
            id: '',
            password: '',
            repassword: ''
        };

        this.activatedRoute.params.subscribe((params: Params) => {
        this.forgotPasswordData.id = params['id'];
      });
    }

    updatePassword() {
        if (this.forgotPasswordData.password == '') {
            var errorMessage = 'Please enter a password';
            this._message.showError(errorMessage);
        }
        else if (this.forgotPasswordData.password.length < 6) {
            var errorMessage = 'Password must be minimum 6 characters';
            this._message.showError(errorMessage);
        }
        else if (this.forgotPasswordData.password != this.forgotPasswordData.repassword) {
            var errorMessage = 'Both password must match';
            this._message.showError(errorMessage);
        }
        else {
            this._appservice.forgotPassword(this.forgotPasswordData)
                .subscribe((Response) => {
                    if (Response.success) {
                        this._message.showSuccess(Response.message);
                        this._router.navigate(['login']);
                    } else {
                        this._message.showWarning(Response.message)
                    }
                }, (Error) => {
                    this._message.showError(Error.message)
                })
        }

    }
}
