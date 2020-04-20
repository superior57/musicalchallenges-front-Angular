import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { CONFIG } from '../../../config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
 
@Injectable()
export class UserService {
  constructor(private _http: Http) { }
  getToken() {
         return localStorage.getItem('admintoken');
    }
  authHeader(headers: Headers) {
      //return new Headers({'x-access-token': this.getToken()});
      headers.append('x-access-token', this.getToken());
  }
  private _errorHandler(error: Response) {

    return Observable.throw(error.json() || "Server Error");
  }
  
  public getAllUser(data:any, admintoken) {
    
    let headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });    
    return this._http.get( CONFIG.API_ENDPOINT + 'userList'+'?number='+data.number , options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  public addUser(value) {
    // console.log(value);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'addUser';
    console.log(URL);
    console.log(options);
    console.log("---------------");

    return this._http.post(URL, value, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  getCountries() {
    let headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    return this._http.get(
      CONFIG.API_ENDPOINT + 'countries',
      { headers: headers }
    )
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  doLogin(loginData) {    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'adminLogin';
    // alert(URL);
    //console.log(URL);
    return this._http.post(URL, loginData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  forgotpassLinksend(forgotpassadmin) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'forgetpassLinksend';

    return this._http.post(URL, forgotpassadmin, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  forgotPassword(forgotPasswordData) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'forgotPassword';

    return this._http.post(URL, forgotPasswordData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  updateUserData(updateData, admintoken) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'updateUserData';

    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  deleteUserData(deleteUserData, admintoken) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'deleteUserData';

    return this._http.post(URL, deleteUserData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  updatePassword(updatePasswordData, admintoken) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'updatePassword?token=' + admintoken;

    return this._http.post(URL, updatePasswordData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  categoryListByType(data) {
      let headers = new Headers({ 'Accept': 'application/json' });
     // this.authHeader(headers);
      let options = new RequestOptions({ headers: headers }); 
      let URL = CONFIG.API_ENDPOINT + 'categoryListByType';  
      return this._http.post(URL, data, options)
        .map((response: Response) => response.json())
        .catch(this._errorHandler);
  }
  getAllCategories(data) {
    let headers = new Headers({ 'Accept': 'application/json' });
    //this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });   
    return this._http.get(CONFIG.API_ENDPOINT + 'categorylist', options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
   getSubCategories(catData, admintoken) {
     console.log(catData);
    let headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });   
    return this._http.post(CONFIG.API_ENDPOINT + 'subCategorylist', catData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  addCategory(data) {
     let headers = new Headers({ 'Content-Type': 'application/json' });
     this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'addCategory';

    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  addSubCategory(data) {
     let headers = new Headers({ 'Content-Type': 'application/json' });
    // this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'addSubCategory';

    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  deleteSubCatData(deleteData, admintoken) {
    console.log("123");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'deleteSubCategory';
    console.log(URL);
    return this._http.post(URL, deleteData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  updateCatData(updateData, admintoken) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'updateCategory';

    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  deleteCatData(deleteData, admintoken) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'deleteCategory';
    console.log(URL);
    return this._http.post(URL, deleteData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

   updateSubCatData(updateData, admintoken) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'updateSubCategory';

    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  public getKaraokeList(data:any, admintoken) {
    // console.log(data);
    let headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers }); 
       
    // return this._http.get(CONFIG.API_ENDPOINT + 'musicList', options)
    //   .map((response: Response) => response.json())
    //   .catch(this._errorHandler);
    let URL =  CONFIG.API_ENDPOINT + 'musicList'+'?number='+data.number;
    // console.log(URL);
    return this._http.get(URL, options)
    .map((response: Response) => response.json())
    .catch(this._errorHandler);
  }

  deleteKaraoke(deleteData, admintoken) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'deleteMusic';
    console.log(URL);
    return this._http.post(URL, deleteData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
   addKaraokeLyric(value , albumimage, karaokefile, lyricfile, dancefile) {
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'addMusic';
    //console.log(file['File']);
    //value.files = file['File'];
    let formData: FormData = new FormData();
    // console.log(albumimage);
    // alert();
    formData.append('albumimage', albumimage);
    formData.append('karaokefile', karaokefile);
    formData.append('lyricfile', lyricfile);
    formData.append('dancefile', dancefile);
    formData.append('songs_name', value.songs_name);    
    formData.append('artist_name', value.artist_name);     
    formData.append('pcat_id', value.pcat_id); 
     
    let headers = new Headers({ 'Accept': 'application/json' });
    /* No need to include Content-Type in Angular 4 */
    //   headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    
    return this._http.post(URL, formData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

   updateMusicData(value , albumimage, karaokefile, lyricfile, dancefile) {
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'updateMusic';
    //console.log(file['File']);
    //value.files = file['File'];
    let formData: FormData = new FormData();
   // formData.append('_id', value._id); 
   for (var key in value) {
     formData.append(key, value[key]);
   }
    formData.append('albumimage', albumimage);
    formData.append('karaokefile', karaokefile);
    formData.append('lyricfile', lyricfile); 
    formData.append('dancefile', dancefile);   
     
    let headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    /* No need to include Content-Type in Angular 4 */
    //   headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    
    return this._http.post(URL, formData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }


/* For CMS */
  getAllCms(data:any) {
  
    let headers = new Headers({ 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.get(
    CONFIG.API_ENDPOINT + 'listCms?size='+data.size+'&number='+data.number,
    options,
    )
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  getCmsPage(data:any) {
  
    let headers = new Headers({ 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.get(
    CONFIG.API_ENDPOINT + 'getCMSPage/'+data.page,
    options,
    )
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  updateCmsData(updateData, admintoken) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'updateCmsData';

    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  deleteCms(deleteData, admintoken) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'deleteCms';
    console.log(URL);
    return this._http.post(URL, deleteData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  addCmsData(updateData, admintoken) {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'addCMS';

    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

/* end of CMS */






 
 

  //sreachIngredient
  sreachIngredient(data: any) {
    let headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    return this._http.get(
      CONFIG.API_ENDPOINT + 'searchingredient?q=' + data.name + '&size=' + data.size + '&number=' + data.number,
      { headers: headers }
    )
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  
    /**
     * delete Recipe
     */

deleteRecipe(data:any){

 let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'deleteRecepie?token=' + this.getToken();

    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
}
 

     

 
 

/*
*
*searchuser
 
*
*/

searchuser(data:any){

      let headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    return this._http.get(
      CONFIG.API_ENDPOINT + 'searchuser?name=' + data.name ,
      { headers: headers }
    )
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
}
    }
