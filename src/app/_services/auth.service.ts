import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'//appmodule eke providers array ekata danna ona ne, mehema dala tyna nisa
})
export class AuthService {

  baseUrl = 'http://localhost:50100/api/auth/';
  userToken : any;


  constructor(private http: Http) { }

  login(model : any){
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers : headers});

    return this.http.post(this.baseUrl + 'login', model, options).map((response : Response)=>{
      const user = response.json();//user variable ekata response eken ena data tika json type eken dagannawa
      if(user){
        localStorage.setItem('token', user.tokenString);
        this.userToken = user.tokenString;//component variable ekakatat dagannawa token eka
      }
    });
   
  }
}
