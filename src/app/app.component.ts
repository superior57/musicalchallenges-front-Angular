import { Component, ViewContainerRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
//import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ToastsManager } from "ng2-toastr/src/toast-manager";
import { EventEmitter, Output ,Input,OnDestroy} from '@angular/core';
import {Broadcaster} from './broadcaster';
import {Observable} from 'rxjs/Rx'

//import 'rxjs/add/operator/filter';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent  {
 
    childTitle:string = 'This text is passed to child';

  @Input()
  userdet: any = null;
  currentpath: any = null;
  isloggedin: any = null;

  constructor(public router: Router,private broadcaster: Broadcaster,
    private toastr: ToastsManager, vRef: ViewContainerRef,
    private location: Location) {
 
    this.toastr.setRootViewContainerRef(vRef);
      
  }
  ngOnInit() {

    var tokenchk = localStorage.getItem("admintoken");

    if (tokenchk == null) {
      this.userdet = false
     // this.router.navigate(['/']);

    } else {
      this.userdet = true

      this.router.navigate(['/home']);

    }
  }

  logoutUser() {
    this.userdet = false
    localStorage.removeItem("admintoken");
    localStorage.clear();
    this.router.navigate(['/login']);
  }

 onNotify($event){
      this.userdet = true

  console.log('event')
  console.log('event')
 }
}
