import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;
  constructor(private http : Http) { }

  getUsers() : Observable<User[]>{
    //getUsers() kiyana method eka observable ekak return karanawa eka User[](user object array ekak) ekak

    return this.http.get(this.baseUrl + 'users', this.jwt())
           .map(response => <User[]>response.json())
           .catch(error => this.handleError(error));
  }
  //Aape api eken token ekak request karanawa neh users la set eka dena controller eka acces karanakota
  //e nisa me request eke api ape token eka yawanna ona

  private jwt(){
    let token = localStorage.getItem('token');

    if(token){
      // let headers = new Headers();
      // headers.append('Authorization', 'Bearer '+token); 
      //Create headers from Plain Old JavaScript Object
      let headers = new Headers({'Authorization' : 'Bearer '+token}); //same meaning
      headers.append('Content-type', 'application/json');
      return new RequestOptions({headers : headers});
    }
  } 

  private handleError(error: any){
    
    const applicationError = error.headers.get("Application-Error");//meken ganne exception wage ewa
    if(applicationError){
      return Observable.throw(applicationError);//meken ewanne epe error message eka witharamai
    }
    
    const serverError = error.json();//body eka thama meken ganne
 
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
