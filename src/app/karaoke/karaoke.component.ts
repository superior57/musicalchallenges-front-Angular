import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserService } from '../userservice/user.service';
import { MessageService } from '../userservice/message.services';
import { Http } from "@angular/http";

@Component({
    selector: 'karaoke',    
    styleUrls: ['./karaoke.component.css'],
    templateUrl: './karaoke.component.html'
})
export class karaokeComponent implements OnInit {  
    size: number;
    number: number;
    keyword: any;
    pagetitle: string;
    edit: boolean;
    userdet: boolean;
    isloggedin: boolean;
    category:any [];
    subcat:any [];    
    music: any = {};
    albumimage:any ={};
    karaokefile:any ={};
    lyricfile:any ={};
    dancefile:any={};
    data: any;    
    admintoken: any;
    constructor(private http: Http,
        private _appservice: UserService,
        private _message: MessageService,
        private location: Location
    ) {
        
        //this.search.email = ''        
       
       
    }
    ngOnInit(): void {
        this.music = {}      
        
        var dataarr = [], query
        this.size = 10
        this.number = 1
        this.admintoken = localStorage.getItem('admintoken');
       var obj = {
            size: this.size,
            number: this.number
        };
        this._appservice.getKaraokeList(obj, this.admintoken).subscribe((Response) => {
             console.log("123");
             if (Response.response_code===4002) {    // block for jwt session timeout
                this._message.showWarning(Response.response_message);
                localStorage.removeItem("admintoken");
                
                localStorage.clear();
                location.reload();
             }else{
            var result = Response.response_data
            for (var index = 0; index < result.length; index++) {
                var dataarrval = {}
                dataarrval['_id'] = result[index]._id
                dataarrval['songs_name'] = result[index].songs_name
                dataarrval['karaoke_length'] = result[index].karaoke_length
                dataarrval['artist_name'] = result[index].artist_name
                // dataarrval['cat_type'] = result[index].cat_type                 
                dataarrval['isDeleted'] = result[index].isDeleted
                dataarrval['createdAt'] = result[index].createdAt
                dataarrval['pcat_id'] = result[index].pcat_id                 
                // dataarrval['cat_id'] = result[index].cat_id
                dataarrval['file_url'] = result[index].file_url
                dataarrval['lyrics_url'] = result[index].lyrics_url
                dataarrval['image_url'] = result[index].image_url
                dataarrval['dance_url'] = result[index].dance_url

                dataarr.push(dataarrval)                
            }
            this.data = dataarr
            //  console.log(dataarr);
            }


        }, (Error) => {
        })
    }
    getCat(str: any) {
        console.log(str);
        this.edit = true
        this.pagetitle = 'Edit Music'
        this.music = str
        this.getCategoryList();
    }
    updateData() {
        var flag = 0, errorMessage, re, isSplChar_name;
        re = /^([a-zA-Z ]+)$/;
        isSplChar_name = !re.test(this.music.pcat_name);
        
        if (this.music.songs_name == '' || this.music.songs_name == undefined) {
            errorMessage = 'Please enter name';
            flag = 1;
            this._message.showError(errorMessage)
            console.log(errorMessage);
            return false;
        }
        if (this.music.songs_name.trim() == '') {
            errorMessage = 'Please enter name';
            flag = 1;
            this._message.showError(errorMessage)
            console.log(errorMessage);
            return false;
        }
        if (isSplChar_name == true) {
            errorMessage = 'Please enter characters only in name';
            flag = 1;
            this._message.showError(errorMessage)
            console.log(errorMessage)
            return false;
        }
        if (this.edit == true && flag == 0) {
            console.log(this.music);
            this._appservice.updateMusicData(this.music,this.albumimage,this.karaokefile,this.lyricfile,this.dancefile)
                .subscribe((Response) => {
                    console.log(Response);
                    if (Response.response_code==2000) {
                        this._message.showSuccess(Response.response_message);
                    } else {
                        this._message.showWarning(Response.response_message)
                    }
                }, (Error) => {
                    this._message.showError(Error.message)
                })
        } else if (this.edit == false && flag == 0) {
           console.log(this.music);             
            this._appservice.addKaraokeLyric(this.music,this.albumimage,this.karaokefile,this.lyricfile,this.dancefile)
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
    add() {
        console.log("add music");
        this.edit = false
        this.pagetitle = 'Add Music'
        this.music = {}   
        this.getCategoryList();   
        
    }
    delete(str: any) {
        console.log(str);
        this.music = str;
        this.edit = true;
        this.deleteData();
    }
    deleteData() {
        var flag = 0, errorMessage, re, isSplChar_name;
        re = /^([a-zA-Z ]+)$/;
        // isSplChar_name = !re.test(this.cat.cat_name);

        this._appservice.deleteKaraoke(this.music, this.admintoken)
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
        var dataarr = []

        this.number = this.number + 1
        this.admintoken = localStorage.getItem('admintoken');
        // var obj = {
        //     name: this.cat_name,
        //     number: this.number,
           
        //     email: this.search.email,
        //     dob: this.search.dob,
        //     gender: this.search.gender
        // }
       var obj = {
            size: this.size,
            number: this.number
        };
       // console.log(obj)
        //console.log('aloke');
        this._appservice.getKaraokeList(obj, this.admintoken).subscribe((Response) => {
             
            console.log(Response);

            var result = Response.response_data
            // console.log(result);
            for (var index = 0; index < result.length; index++) {
                var dataarrval = {}
                dataarrval['_id'] = result[index]._id
                dataarrval['songs_name'] = result[index].songs_name
                dataarrval['karaoke_length'] = result[index].karaoke_length
                dataarrval['artist_name'] = result[index].artist_name
                dataarrval['isDeleted'] = result[index].isDeleted
                dataarrval['createdAt'] = result[index].createdAt
                dataarrval['pcat_id'] = result[index].pcat_id   
                dataarrval['file_url'] = result[index].file_url
                dataarrval['lyrics_url'] = result[index].lyrics_url
                dataarrval['image_url'] = result[index].image_url
                dataarrval['dance_url'] = result[index].dance_url
                this.data.push(dataarrval)
            }
            //  console.log(dataarr);


        }, (Error) => {
        })

    }
    onTypeSelect(type) {
        console.log(type);
        var catarr = [], query
            this._appservice.getAllCategories({}).subscribe((Response) => {
                 
                var result = Response.response_data
                console.log(result);
                for (var index = 0; index < result.length; index++) {
                    var catarrval = {}
                     
                    catarrval['cat_name'] = result[index].cat_name
                    catarrval['type'] = result[index].type                 
                    catarrval['isDeleted'] = result[index].isDeleted
                    catarrval['createdAt'] = result[index].createdAt                 
                    catarrval['c_id'] = result[index]._id
                    catarr.push(catarrval)
                }
                // this.category = catarr.filter((item)=> item.type == type);
               this.category = catarr
                //  console.log(catarr);
            }, (Error) => {
            })
    }
    getCategoryList() {
        var catarr = [], query
            this._appservice.getAllCategories({}).subscribe((Response) => {
                 
                var result = Response.response_data
                for (var index = 0; index < result.length; index++) {
                    var catarrval = {}
                     
                    catarrval['cat_name'] = result[index].cat_name              
                    catarrval['isDeleted'] = result[index].isDeleted
                    catarrval['createdAt'] = result[index].createdAt                 
                    catarrval['c_id'] = result[index]._id
                    catarr.push(catarrval)
                }
                // this.category = catarr.filter((item)=> item.type == type);
               this.category = catarr
                 console.log(this.category);
            }, (Error) => {
            })
    }
    onGenreSelect(pcat_id) { 
    // console.log(pcat_id);  
        this.admintoken = localStorage.getItem('admintoken');
        var obj = {        
            pcat_id: pcat_id
        }
      var catarr = [], query
        this._appservice.getSubCategories(obj, this.admintoken).subscribe((Response) => {
             
            // console.log(Response);
            var result = Response.response_data
            console.log(result);
            for (var index = 0; index < result.length; index++) {
                var catarrval = {}
                 
                catarrval['cat_name'] = result[index].cat_name
                catarrval['type'] = result[index].type                 
                catarrval['isDeleted'] = result[index].isDeleted
                catarrval['createdAt'] = result[index].createdAt                 
                catarrval['c_id'] = result[index]._id
                catarrval['p_id'] = result[index].p_id
                catarr.push(catarrval)
            }
            this.subcat = catarr.filter((item)=> item.p_id == pcat_id);
           // this.category = catarr
             console.log(this.subcat);
        }, (Error) => {
        })
    }
    onImageFileSelected (fileInput) {
     // console.log(fileInput);       
        let myFile = fileInput.target.files[0];
        this.albumimage=myFile;  
    }
    onMusicFileSelected (fileInput) {
     // console.log(fileInput);
        let myFile = fileInput.target.files[0];
        this.karaokefile=myFile;       
    }
    onlyricFileSelected (fileInput) {
     // console.log(fileInput);        
        let myFile = fileInput.target.files[0];
        this.lyricfile=myFile;      
    }
    onDanceFileSelected (fileInput) {
        // console.log(fileInput);
        let myFile = fileInput.target.files[0];
        this.dancefile=myFile;       
    }  
    
}
