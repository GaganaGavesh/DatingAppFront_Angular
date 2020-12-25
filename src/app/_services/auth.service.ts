import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'//appmodule eke providers array ekata danna ona ne, mehema dala tyna nisa
})
export class AuthService {

  baseUrl = 'http://localhost:50100/api/auth/';
  userToken : any;


  constructor(private http: Http) { }

  login(model : any){
    // const headers = new Headers({'Content-type': 'application/json'});
    // const options = new RequestOptions({headers : headers});

    return this.http.post(this.baseUrl + 'login', model, this.requestOptions()).map((response : Response)=>{
      const user = response.json();//user variable ekata response eken ena data tika json type eken dagannawa
      if(user){
        localStorage.setItem('token', user.tokenString);
        this.userToken = user.tokenString;//component variable ekakatat dagannawa token eka
      }
    }).catch(this.handleError);
  }

  register(model : any){
    return this.http.post(this.baseUrl + 'register', model, this.requestOptions());
  }

  private requestOptions(){
    const headers = new Headers({'Content-type': 'application/json'});
    return new RequestOptions({headers : headers});
  }

  //Ape app ekata errors(client components and API eka athara) enna pluwn API eken ewa catch karaganna apata method ekak onaa
  //nathnam e actual error ekama userta display wenawa neh, eka apata custom error ekak widiyata harawala denna pluwan 
  //e error eka catch kara gaththama

  private handleError(error: any){
    //meka api ganne api ekee exception handle karanna dapu method eken return wena
    //response eke header eken.."Application-Error" meka thama header eke message eka tyna thana key eka
    const applicationError = error.headers.get("Application-Error");
    if(applicationError){
      return Observable.throw(applicationError);//meken ewanne epe error message eka witharamai
    }
    //dan karanne model state errors tika ganna eka body eken.
    //"{"Password":["The Password field is required."],"Username":["The Username field is required."]}"
    //meke error description eka ganna nam key eken key eka loop karanna ona
    const serverError = error.json();
    let modelStateError = '';
    if(serverError){
      for(const key in serverError){
        if(serverError[key]){
          modelStateError += serverError[key]+ '\n';
        }
      }
    }
    return Observable.throw(modelStateError || 'serverError');
  }

}
