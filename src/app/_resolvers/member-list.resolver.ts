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
export class MemberListResolver implements Resolve<User[]>{
    
    pageSise: number = 5;
    pageNumber: number = 1;

    constructor(
        private userService : UserService, 
        private router : Router, 
        private alertify : AlertifyService){}

    //resolve kiyanne Resolve kiyana interface ke tyna method ekak
    resolve(route : ActivatedRouteSnapshot) : Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSise).catch(error => {
            this.alertify.error('Problem n retrieving data');
            this.router.navigate(['/home']);
            return Observable.of(null);
            //methenta return wenne Observable<PaginatedResult<Users[]>> ekak, 
            //resolver eka use karna thana thama  subscribe karanna ona
            //catch kalath observable ekakma pita wena widiyata tyenna ona aniwaryen
            //mokada return wenna ona observable ekak neh
        })

    }

}