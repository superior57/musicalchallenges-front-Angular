import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
//import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserService } from '../userservice/user.service';
import { MessageService } from '../userservice/message.services';
import { Http } from "@angular/http";
@Component({
    selector: 'home',
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    search: any = {};
    keyword:any;
    size: number;
    number: number;
    pagetitle: string;
    edit: boolean;
    userdet: boolean;
    isloggedin: boolean;
    dobyear: any[];    
    usr: any = {}
    data: any;
    userlist: any;
    admintoken: any;
    constructor(private http: Http,
        private _appservice: UserService,
        private _message: MessageService,
        public router: Router
        
    ) {
        this.search.name = ''
        this.search.email = ''              
        this.search.gender = ''
       
    }
    ngOnInit(): void {
        // console.log(this.search)
        this.usr = {}
        var date = new Date()
        var y = []
        for (var index = 1900; index < date.getFullYear(); index++) {
            y.push(index)
        }
        this.dobyear = y
        
        var userarr = [], query
        this.size = 10
        this.number = 1
        this.admintoken = localStorage.getItem('admintoken');
        var obj = {
            size: this.size,
            number: this.number,
            name: this.search.name,
            email: this.search.email,            
            gender: this.search.gender
        }
        // console.log(obj)
        //console.log('aloke');
        this._appservice.getAllUser(obj, this.admintoken).subscribe((Response) => {
             
            // console.log(Response);
            if (Response.success) {
                        var result = Response.response_data
                        for (var index = 0; index < result.length; index++) {
                            var userarrval = {}
                            userarrval['profileImage'] = result[index].image_url
                            userarrval['name'] = result[index].name
                            userarrval['email'] = result[index].email
                            userarrval['username'] = result[index].username
                            userarrval['aboutme'] = result[index].aboutme
                            userarrval['gender'] = result[index].gender
                            userarrval['reportCount'] = result[index].reportCount  
                            userarrval['createdAt'] = result[index].createdAt
                            userarrval['isBlocked'] = result[index].isBlocked
                            userarrval['_id'] = result[index]._id
                            userarr.push(userarrval)
                        }
                        this.data = userarr
                      //   console.log(userarr);
                    } else {
                        this._message.showWarning(Response.response_message);
                        localStorage.removeItem("admintoken");
                        localStorage.clear();
                        location.reload();

                    }
           
        }, (Error) => {
        })
    }
    getuser(str: any) {
        this.edit = true
        this.pagetitle = 'Edit User'
        var date = new Date()
        var y = []
        for (var index = 1900; index < date.getFullYear(); index++) {
            y.push(index)
        }
        this.dobyear = y
        this.usr = str
    }
    updateUserData() {
        var flag = 0, errorMessage, re, isSplChar_name;
        re = /^([a-zA-Z ]+)$/;
        isSplChar_name = !re.test(this.usr.name);
        if (this.usr.name == '' || this.usr.name == undefined) {
            errorMessage = 'Please enter name';
            flag = 1;
            this._message.showError(errorMessage)
            console.log(errorMessage);
            return false;
        }
        if (this.usr.name.trim() == '') {
            errorMessage = 'Please enter name';
            flag = 1;
            this._message.showError(errorMessage)
            // console.log(errorMessage);
            return false;
        }
        if (isSplChar_name == true) {
            errorMessage = 'Please enter characters only in name';
            flag = 1;
            this._message.showError(errorMessage)
            // console.log(errorMessage)
            return false;
        }
        if (this.usr.email == '' || this.usr.email == undefined) {
            errorMessage = 'Please enter email';
            // console.log(errorMessage);
            flag = 1;
            this._message.showError(errorMessage)
            return false;
        }
        if (this.usr.gender == "" || this.usr.gender == undefined) {
            errorMessage = 'Please select a gender';
            flag = 1;
            this._message.showError(errorMessage)
            // console.log(errorMessage)
            return false;
        }
        
        // if (this.usr.isBlocked == "" || this.usr.isBlocked == undefined) {
        //     errorMessage = 'Are you want to Blocked the user';
        //     flag = 1;
        //     this._message.showError(errorMessage)
        //     console.log(errorMessage)
        //     return false;
        // }
         
        if (this.edit == true && flag == 0) {
            this._appservice.updateUserData(this.usr, this.admintoken)
                .subscribe((Response) => {
                    // console.log(Response);
                    if (Response.success) {
                        this._message.showSuccess(Response.message);
                    } else {
                        this._message.showWarning(Response.message)
                    }
                }, (Error) => {
                    this._message.showError(Error.message)
                })
        } else if (this.edit == false && flag == 0) {
            // console.log(this.usr)
            this._appservice.addUser(this.usr)
                .subscribe((Response) => {
                    // console.log(Response)
                    if (Response.response_code==2000) {
                        this._message.showSuccess(Response.response_message);
                        this.ngOnInit()
                    } else {
                        this._message.showWarning(Response.response_code+':'+Response.response_message)
                    }
                }, (Error) => {
                    this._message.showError(Error.message)
                })
        } else {
        }
    }
    adduser() {
        this.edit = false
        this.pagetitle = 'Add User'
        this.usr = {}
        var date = new Date()
        var y = []
        for (var index = 1900; index < date.getFullYear(); index++) {
            y.push(index)
        }
        this.dobyear = y
        // this._appservice.getCountries().subscribe((response) => {
        //     this.countries = response.data;
        //     console.log(response.data);
        // }, (error) => {
        //     console.log(error);
        // });
    }
    delete(str: any) {
        console.log(str);
        this.usr = str;
        this.edit = true;
        this.deleteData();
    }
    deleteData() {
        var flag = 0, errorMessage, re, isSplChar_name;
        re = /^([a-zA-Z ]+)$/;
        // isSplChar_name = !re.test(this.cat.cat_name);

        this._appservice.deleteUserData(this.usr, this.admintoken)
                .subscribe((Response) => {
                    console.log(Response);
                    if (Response.response_code==2000) {
                        this._message.showSuccess(Response.response_message);
                        this.ngOnInit()
                    } else {
                        this._message.showWarning(Response.response_message);
                        localStorage.clear();
                        location.reload();
                    }
                }, (Error) => {
                    this._message.showError(Error.message)
                })
    }
    loadmore() {
        var userarr = []
        this.number = this.number + 1
        this.admintoken = localStorage.getItem('admintoken');
        var obj = {
            size: this.size,
            number: this.number,
            name: this.search.name,
            email: this.search.email,            
            gender: this.search.gender,
            country: this.search.country,
            macNutProf: this.search.macNutProf
        }
        this._appservice.getAllUser(obj, this.admintoken).subscribe((Response) => {
            var result = Response.response_data
            console.log(result);
            for (var index = 0; index < result.length; index++) {
                var userarrval = {}
                userarrval['profileImage'] = result[index].image_url
                userarrval['name'] = result[index].name
                userarrval['email'] = result[index].email
                userarrval['username'] = result[index].username
                userarrval['aboutme'] = result[index].aboutme
                userarrval['gender'] = result[index].gender
                userarrval['reportCount'] = result[index].reportCount  
                userarrval['createdAt'] = result[index].createdAt
                userarrval['isBlocked'] = result[index].isBlocked
                userarrval['_id'] = result[index]._id
                this.data.push(userarrval)
            }
        }, (Error) => {
        })
    }
    clear() {
      
        this.search.name = ''
        this.search.email = ''
        // this.search.dob = ''
        // this.search.gender = ''
        // this.search.country = ''
        // this.search.macNutProf = ''
        this.ngOnInit()
    }
}
