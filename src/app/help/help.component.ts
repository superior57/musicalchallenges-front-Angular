import { Component,Input, OnInit,EventEmitter, Output,Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../userservice/user.service';
import { MessageService } from '../userservice/message.services';
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { CONFIG } from '../../../config';

import {Broadcaster} from '../broadcaster';
import {Observable} from 'rxjs/Rx'
@Component({
    selector: 'help',
    styleUrls: ['./help.component.css'],
    templateUrl: './help.component.html'
})
export class HelpComponent implements OnInit {
	
    pagetitle: string;
    pagecontent: string;
	
    
    constructor(private http: Http,
        private _appservice: UserService,
        private _message: MessageService,
        private _router: Router,
        private broadcaster: Broadcaster
     ) {
		 this.pagetitle = ''
		 this.pagecontent = ''
    }
    ngOnInit(): void {
        var obj={page:"help"}
		 this._appservice.getCmsPage(obj).subscribe((Response) => {
            console.log(Response)
			 this.pagetitle = 'Help'
			 this.pagecontent = Response.response_data.content
			
        }, (Error) => {
        })
        
    }

    

    

   
}
