import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../_models/User";
import { AlertifyService } from "../_services/alertify.service";
import { UserService } from "../_services/user.service";
import 'rxjs/add/operator/catch'
//Interface that classes can implement to be a data provider. A data provider class can be used with 
//the router to resolve data during navigation. The interface defines a resolve() method that is invoked 
//when the navigation starts. The router waits for the data to be resolved before the route is finally activated.
@Injectable()
export class ListsResolver implements Resolve<User[]>{
    //me resolver eka ganne Likes send and Likes receive user list eka gannna 
    //me wadetath resolver ekak onba mkooo meka wenama route ekaka thama preview wenne e nisa resolver eka haraha 
    //data tika pick karagena thama route eka load wenne
    
    pageSise: number = 5;
    pageNumber: number = 1;
    likesparam = 'Likers';

    constructor(
        private userService : UserService, 
        private router : Router, 
        private alertify : AlertifyService){}

    //resolve kiyanne Resolve kiyana interface ke tyna method ekak
    resolve(route : ActivatedRouteSnapshot) : Observable<User[]> {
        //methana null dala tynne api userParams kiyana parameter eka yawanne nathi nisa
        return this.userService.getUsers(this.pageNumber, this.pageSise, null, this.likesparam).catch(error => {
            this.alertify.error('Problem n retrieving data');
            this.router.navigate(['/home']);
            return Observable.of(null);
        })

    }

}