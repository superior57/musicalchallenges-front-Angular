import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../userservice/user.service';
import { MessageService } from '../userservice/message.services';
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { CONFIG } from "../../../config";

@Component({
    selector: 'cms',
    styleUrls: ['./cms.component.css'],
    templateUrl: './cms.component.html',
})
// class Select
export class CmsComponent implements OnInit {
    search: any = {};
    size: number;
    number: number;
    pagetitle: string;
    edit: boolean;
    userdet: boolean;
    isloggedin: boolean;
    dobyear: any[];
    cms: any = {}
    data: any;
    userlist: any;
    admintoken: any;
	category: any;
    constructor(private http: Http,
        private _appservice: UserService,
        private _message: MessageService,
    ) {
        
        //this.search.email = ''
    }
    ngOnInit(): void {
        this.cms = {}
        
        
        var userarr = [], query
        this.size = 10
        this.number = 1
        this.admintoken = localStorage.getItem('admintoken');
        var obj = {
            size: this.size,
            number: this.number
           
        }
        this._appservice.getAllCms(obj).subscribe((Response) => {
           // console.log(Response);
            var result = Response.response_data
            for (var index = 0; index < result.length; index++) {
                var cmsarrval = {}
                cmsarrval['keyword'] = result[index].keyword
                cmsarrval['content'] = result[index].content
                cmsarrval['createdAt'] = result[index].createdAt
                cmsarrval['_id'] = result[index]._id
                userarr.push(cmsarrval)
            }
            this.data = userarr
        }, (Error) => {
        })
		
    }
    getcmspage(str: any) {
        this.edit = true
        this.pagetitle = 'Edit '+str.keyword+' page'
      // console.log(str);
        this.cms = str
    }
    deletecmspage(str: any) {
        console.log(str);
        this.cms = str;
        this.pagetitle = 'Are you sure delete this music?'
        this.edit = true;
    }
    deleteData() {
        var flag = 0, errorMessage, re, isSplChar_name;
        re = /^([a-zA-Z ]+)$/;
        // isSplChar_name = !re.test(this.cat.cat_name);

        this._appservice.deleteCms(this.cms, this.admintoken)
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
    updateCmsData() {
		console.log(this.cms)
        var flag = 0, errorMessage, re, isSplChar_name, isSplChar_lname;
        re = /^([a-zA-Z ]+)$/;
        isSplChar_name = !re.test(this.cms.keyword);
        
		if (this.cms.keyword == '' || this.cms.keyword == undefined) {
            errorMessage = 'Please enter keyword';
            console.log(errorMessage);
            flag = 1;
            this._message.showError(errorMessage)
            return false;
        }
        if (this.cms.content == '' || this.cms.content == undefined) {
            errorMessage = 'Please enter description';
            console.log(errorMessage);
            flag = 1;
            this._message.showError(errorMessage)
            return false;
        }
        
		
        if (this.edit == true && flag == 0) {
			  console.log(this.cms);
            this._appservice.updateCmsData(this.cms, this.admintoken)
                .subscribe((Response) => {
                    if (Response.response_code===2000) {
                        this._message.showSuccess(Response.response_message);
                    } else {
                        this._message.showWarning(Response.response_message)
                    }
                }, (Error) => {
                    this._message.showError(Error.message)
                })
        } else if (this.edit == false && flag == 0) {
          
            this._appservice.addCmsData(this.cms, this.admintoken)
                .subscribe((Response) => {
                    if (Response.response_code===2000) {
                        this._message.showSuccess(Response.response_message);
                        this.ngOnInit()
                    } else {
                        this._message.showWarning(Response.response_message)
                    }
                }, (Error) => {
                    this._message.showError(Error.message)
                })
        } else {
        }
    }
    adduser() {
        this.edit = false
        this.pagetitle = 'Add Cms Pages'
        this.cms = {}     
      
    }
    loadmore() {
        var userarr = []
        this.number = this.number + 1
        this.admintoken = localStorage.getItem('admintoken');
        var obj = {
            size: this.size,
            number: this.number
        }
        this._appservice.getAllCms(obj).subscribe((Response) => {
            var result = Response.response
            for (var index = 0; index < result.length; index++) {
                var cmsarrval = {}
                cmsarrval['keyword'] = result[index].keyword
				cmsarrval['content'] = result[index].content
                cmsarrval['createdAt'] = result[index].createdAt
                cmsarrval['_id'] = result[index]._id
                this.data.push(cmsarrval)
            }
        }, (Error) => {
        })
    }
    clear() {
      
        
        this.ngOnInit()
    }
	
}
