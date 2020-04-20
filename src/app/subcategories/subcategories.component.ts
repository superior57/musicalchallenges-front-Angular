import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserService } from '../userservice/user.service';
import { MessageService } from '../userservice/message.services';
import { Http } from "@angular/http";

@Component({
    selector: 'subcategories',    
    styleUrls: ['./subcategories.component.css'],
    templateUrl: './subcategories.component.html'
})
export class SubCategoryComponent implements OnInit {  
    size: number;
    keyword:any;
    number: number;
    pagetitle: string;
    edit: boolean;
    userdet: boolean;
    isloggedin: boolean;
    category: any = []; 
    cat: any = {};
    data: any;
    userlist: any;
    admintoken: any;
    constructor(private http: Http,
        private _appservice: UserService,
        private _message: MessageService,
    ) {
        
        //this.search.email = ''        
       
       
    }
    ngOnInit(): void {
        console.log("start-subcategory");
    //    console.log(this.search)
        this.cat = {}
       
        
        var catarr = [], query
        this.size = 10
        this.number = 1
        this.admintoken = localStorage.getItem('admintoken');
        // var obj = {
        //     pcat_id: "",
        //     p_id: "",
        //     cat_name: ""
        // };
        var obj = {};
       // console.log(obj)
        //console.log('aloke');
        this._appservice.getSubCategories(obj, this.admintoken).subscribe((Response) => {
             
            console.log(Response);
            if (Response.response_code===2000) {
                var result = Response.response_data
                for (var index = 0; index < result.length; index++) {
                    var catarrval = {}
                    catarrval['cat_name'] = result[index].cat_name
                    catarrval['type'] = result[index].type                 
                    catarrval['isDeleted'] = result[index].isDeleted
                    catarrval['createdAt'] = result[index].createdAt                 
                    catarrval['cat_id'] = result[index]._id
                    catarrval['p_id'] = result[index].p_id
                    catarrval['pcat_name'] = result[index].pcat_name
                    catarr.push(catarrval)
                }
                this.data = catarr
               //  console.log(catarr);
            } else if (Response.response_code===4002) {
                        this._message.showWarning(Response.response_message);
                        localStorage.removeItem("admintoken");
                        localStorage.clear();
                        location.reload();
                       // this.router.navigate(['/login']);
            }else{
                this._message.showWarning(Response.response_message);
            }
        }, (Error) => {
        })
    }
    onSelect(type) {
        console.log(type);
        //var obj={type:type};
        var catarr = [], query
            this._appservice.getAllCategories({}).subscribe((Response) => {
                 
                console.log(Response);
                if(Response.response_code===2000)
                {
                    var result = Response.response_data
                    for (var index = 0; index < result.length; index++) {
                        var catarrval = {}
                         
                        catarrval['cat_name'] = result[index].cat_name
                        catarrval['type'] = result[index].type                 
                        catarrval['isDeleted'] = result[index].isDeleted
                        catarrval['createdAt'] = result[index].createdAt                 
                        catarrval['c_id'] = result[index]._id
                        catarr.push(catarrval)
                    }
                    this.category = catarr.filter((item)=> item.type == type);
                   // this.category = catarr
                     console.log(catarr);
                }else{
                    this._message.showWarning(Response.response_message);
                }
            }, (Error) => {
            })
    }
    
    getCat(str: any) {
        console.log(str);
        this.edit = true
        this.pagetitle = 'Edit Category'
        var catarr = [], query
        this._appservice.getAllCategories({}).subscribe((Response) => {             
           // console.log(Response);
            var result = Response.response_data
            for (var index = 0; index < result.length; index++) {
                var catarrval = {}
                 
                catarrval['cat_name'] = result[index].cat_name
                catarrval['type'] = result[index].type                 
                catarrval['isDeleted'] = result[index].isDeleted
                catarrval['createdAt'] = result[index].createdAt                 
                catarrval['c_id'] = result[index]._id
                catarr.push(catarrval)
            }
           // this.category = catarr;
            this.category = catarr.filter((item)=> item.type == str.type);
           // this.category = catarr
             console.log(catarr);
        }, (Error) => {
        })
        this.cat = str
    }
    updateData() {
        var flag = 0, errorMessage, re, isSplChar_name;
        re = /^([a-zA-Z ]+)$/;
        isSplChar_name = !re.test(this.cat.cat_name);
        if (this.cat.cat_name == '' || this.cat.cat_name == undefined) {
            errorMessage = 'Please enter name';
            flag = 1;
            this._message.showError(errorMessage)
            console.log(errorMessage);
            return false;
        }
        if (this.cat.cat_name.trim() == '') {
            errorMessage = 'Please enter name';
            flag = 1;
            this._message.showError(errorMessage)
            console.log(errorMessage);
            return false;
        }
        // if (isSplChar_name == true) {
        //     errorMessage = 'Please enter characters only in name';
        //     flag = 1;
        //     this._message.showError(errorMessage)
        //     console.log(errorMessage)
        //     return false;
        // }
        if (this.edit == true && flag == 0) {
            this._appservice.updateSubCatData(this.cat, this.admintoken)
                .subscribe((Response) => {
                    console.log(Response);
                    if (Response.response_code==2000) {
                        this._message.showSuccess(Response.response_message);
                    } else {
                        this._message.showWarning(Response.response_message);
                        localStorage.clear();
                        location.reload();
                    }
                }, (Error) => {
                    this._message.showError(Error.message)
                })
        } else if (this.edit == false && flag == 0) {
            console.log(this.cat)
            this._appservice.addSubCategory(this.cat)
                .subscribe((Response) => {
                    console.log(Response)
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
    delete(str: any) {
        console.log(str);
        this.cat = str;
        this.edit = true;
        this.deleteData();
    }
    deleteData() {
        var flag = 0, errorMessage, re, isSplChar_name;
        re = /^([a-zA-Z ]+)$/;
        // isSplChar_name = !re.test(this.cat.cat_name);

        this._appservice.deleteSubCatData(this.cat, this.admintoken)
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
    add() {
        this.edit = false
        this.pagetitle = 'Add Category'
        console.log(this.cat);
        console.log("add function");
        this.cat = {}
        
        
        // this._appservice.getCountries().subscribe((response) => {
        //     this.countries = response.data;
        //     console.log(response.data);
        // }, (error) => {
        //     console.log(error);
        // });
    }
    // loadmore() {
    //     var userarr = []
    //     this.number = this.number + 1
    //     this.admintoken = localStorage.getItem('admintoken');
    //     var obj = {
    //         size: this.size,
    //         number: this.number,
    //         name: this.search.name,
    //         email: this.search.email,
    //         dob: this.search.dob,
    //         gender: this.search.gender,
    //         country: this.search.country,
    //         macNutProf: this.search.macNutProf
    //     }
    //     this._appservice.getAllUser(obj).subscribe((Response) => {
    //         var result = Response.data
    //         for (var index = 0; index < result.length; index++) {
    //             var userarrval = {}
    //             userarrval['profileImage'] = result[index].image_url
    //             userarrval['name'] = result[index].name
    //             userarrval['email'] = result[index].email
    //             userarrval['username'] = result[index].username
    //             userarrval['aboutme'] = result[index].aboutme
    //             userarrval['gender'] = result[index].gender                 
    //             userarrval['createdAt'] = result[index].createdAt
    //             userarrval['_id'] = result[index]._id
    //             this.data.push(userarrval)
    //         }
    //     }, (Error) => {
    //     })
    // }
    
    
}
