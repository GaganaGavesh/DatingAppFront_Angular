import { isNull } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
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

  //angular JWT library
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();//JwtHelper kiyana class eke thama decodeToken method eka tynne
  //e class eke instance ekak ona me method eka call karanna. e nisa me instance eka hadagaththa
  //decodeToken method eken enne decoded token ekak typeeka "any"
  //eka dagannawa decodedToken kiyana variable ekata

  constructor(private http: Http) { }

  login(model : any){
    // const headers = new Headers({'Content-type': 'application/json'});
    // const options = new RequestOptions({headers : headers});
    
    return this.http.post(this.baseUrl + 'login', model, this.requestOptions()).map((response : Response)=>{
      const user = response.json();//user variable ekata response eken ena data tika json type eken dagannawa
      if(user){
        localStorage.setItem('token', user.tokenString);//key value widiyata thama save wenne
        this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
        console.log(this.decodedToken);
        this.userToken = user.tokenString;//component variable ekakatat dagannawa token eka
      }
    }).catch(error => this.handleError(error));//subscribe karala tyna thana error ekata yanne methanin catch karaganna error eka
    //.catch(this.handleError);//mehema witharak dannath pluwaan, hariyatama danne ne mokoda kiyalla
  }

  register(model : any){
    return this.http.post(this.baseUrl + 'register', model, this.requestOptions()).catch(error => this.handleError(error));
    //Catches errors on the observable to be handled by returning a new observable or throwing an error.
  }

  loggedIn(){
    return tokenNotExpired('token');//meken ape local storage eke token vlue ekata adala 
    //key eka thama denna ona
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

    const applicationError = error.headers.get("Application-Error");//meken ganne exception wage ewa
    if(applicationError){
      return Observable.throw(applicationError);//meken ewanne epe error message eka witharamai
    }
    //dan karanne model state errors tika ganna eka body eken.
    //"{"Password":["The Password field is required."],"Username":["The Username field is required."]}"
    //meke error description eka ganna nam key eken key eka loop karanna ona
    // console.log(error);
    // console.log("OK "+error.ok);
    // if(error){
    //   console.log("Not empty error");
    // }
    const serverError = error.json();//meken ganne model stete errors wage dewal
    //me error kiyala allaganne body eke tyna error message tika mm hithanne
 
    let modelStateError = '';
    if(serverError){
      for(const key in serverError){
        if(serverError[key]){
          modelStateError += serverError[key]+ '\n';
        }
      }
    }
    return Observable.throw(modelStateError || 'serverError');
    //Creates an Observable that emits no items to the Observer and immediately emits an error notification.
    //Just emits 'error', and nothing else.
  }

}
