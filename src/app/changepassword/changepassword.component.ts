
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../userservice/user.service';
import { MessageService } from '../userservice/message.services';
import { Http } from "@angular/http";

export class UpdatePasswordData {
    password: string;
    repassword: string;
}

@Component({
    selector: 'changepassword',
    styleUrls: ['./changepassword.component.css'],
    templateUrl: './changepassword.component.html'
})
export class ChangepasswordComponent implements OnInit {

    admintoken: any;

    updatePasswordData: UpdatePasswordData;

    constructor(private http: Http,
        private _appservice: UserService,
        private _message: MessageService,
    ) {
    }
    ngOnInit(): void {

        this.admintoken = localStorage.getItem('admintoken');

        this.updatePasswordData = {
            password: '',
            repassword: ''
        };
    }

    updatePassword() {
        if (this.updatePasswordData.password == '') {
            var errorMessage = 'Please enter a password';
            this._message.showError(errorMessage);
        }
        else if (this.updatePasswordData.password.length < 6) {
            var errorMessage = 'Password must be minimum 6 characters';
            this._message.showError(errorMessage);
        }
        else if (this.updatePasswordData.password != this.updatePasswordData.repassword) {
            var errorMessage = 'Both password must match';
            this._message.showError(errorMessage);
        }
        else {
            this._appservice.updatePassword(this.updatePasswordData, this.admintoken)
                .subscribe((Response) => {
                    if (Response.success) {
                        this._message.showSuccess(Response.message);
                    } else {
                        this._message.showWarning(Response.message)
                    }
                }, (Error) => {
                    this._message.showError(Error.message)
                })
        }

    }
}
