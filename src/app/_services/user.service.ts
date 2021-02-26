import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import { ThrowStmt } from '@angular/compiler';
import { PaginatedResult } from '../_models/Pagination';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;
  constructor(private http : Http) { }

  getUsers(page?: number, itemsForPage?: number, userParams?: any, likesParam? : string) : Observable<PaginatedResult<User[]>>{
    //getUsers() kiyana method eka observable ekak return karanawa eka User[](user object array ekak) ekak
    
    //BEFORE PAGINATION
    // return this.http.get(this.baseUrl + 'users', this.jwt())
    //        .map(response => <User[]>response.json())//body eka JSON object ekak karanawa, e map una response eka 
    //        //<User[]> type eke observable ekak karanne <User[]> dapu eken.
    //        .catch(error => this.handleError(error));

    //AFTER PAGINATION
    const paginatedResult: PaginatedResult<User[]>  = new PaginatedResult<User[]>();

    //This our query string
    let queryString: string = '?';//let kiyala danne string append wenakota aluth string hadenawaneh,
    // e nisa pointer eka wenas wenawa, strings immutable nisa thama me scene eka wennee
    if(page != null && itemsForPage != null){
      queryString +=  'pageNumber=' + page + '&pageSize=' + itemsForPage + '&';
    }//query string ekak tyenam ekath URL ekata append karanawa

    if(likesParam === 'Likers'){
      queryString += 'Likers=true&'
    }

    if(likesParam === 'Likees'){
      queryString += 'Likees=true&'
    }

    if(userParams != null){
      queryString += 
        'minAge=' + userParams.minAge + 
        '&maxAge=' + userParams.maxAge + 
        '&gender=' + userParams.gender +
        '&orderBy=' + userParams.orderBy;
    }
    //dan meke response eke enawa body ekai headers nui dekak. api normal response eka acces kalama bodu eke eka enawa
    //response.headers.get('Pagination') kiyala dammama headers enawa, e deka bedala 
    //paginatedResult object eke property dekata dagannawa
    return this.http.get(this.baseUrl + 'users' + queryString, this.jwt())
            .map((response : Response) => { 
              paginatedResult.result = response.json();

              if(response.headers.get('Pagination') != null){
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
              }
              return paginatedResult;
            })
           .catch(error => this.handleError(error));
  }
  //Aape api eken token ekak request karanawa neh users la set eka dena controller eka acces karanakota
  //e nisa me request eke api ape token eka yawanna ona

  getUser(id : number) : Observable<User> {
    return this.http.get(this.baseUrl + 'users/'+ id, this.jwt())
           .map(response => <User>response.json())
           .catch(error => this.handleError(error));
  }

  updateUser(id : number, user : User) {
    return this.http.put(this.baseUrl + 'users/' + id, user, this.jwt()).catch(this.handleError);
  }

  setMainPhoto(userId: number, id: number){
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {}, this.jwt())
           .catch(err => this.handleError(err));
           //meka post method ekak unath api Body ekata monawath danne ne, url eke thama me dewal danne
           //body ekee empty object ekak thama yawanne
  }
  
  deletePhoto(userId: number, photoId: number){
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + photoId, this.jwt())
           .catch(err => this.handleError(err));
  }

  sendLike(id: number, recipientId: number){
    //Post request danakota body eke monawath nathnam empty object ekak yawannama ona nathnam wada karanne ne,
    //request content ekak nathnam aniwa {} danna ona
    return this.http.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {}, this.jwt())
           .catch(err => this.handleError(err));
  }

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
    if(error.status == 400){
      return Observable.throw(error._body);
      //error kiyalath enne response ekak ma thama eke status, _body etc tynawa me wage
      //_body eke tyna message eka thama print karanna ona
      // headers: Headers
      // _headers: Map(1) {"content-type" => Array(1)}
      // _normalizedNames: Map(1) {"content-type" => "content-type"}
      // __proto__: Object
      // ok: false
      // status: 400
      // statusText: "Bad Request"
      // type: 2
      // url: "http://localhost:50100/api/users/2/like/12"
      // _body: "You have already liked the user"
      // __proto__: Body
    }
    console.log(error);
    
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
