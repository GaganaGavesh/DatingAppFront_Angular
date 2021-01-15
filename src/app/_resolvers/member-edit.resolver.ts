import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../_models/User";
import { AlertifyService } from "../_services/alertify.service";
import { UserService } from "../_services/user.service";
import 'rxjs/add/operator/catch'
import { AuthService } from "../_services/auth.service";

@Injectable()
export class MemberEditResolver implements Resolve<User>{
    
    constructor(
        private userService : UserService, 
        private router : Router, 
        private alertify : AlertifyService,
        private authService : AuthService){}

    resolve(route : ActivatedRouteSnapshot) : Observable<User> {
        //id eka danna hadanne decoded token eken aragena
        //mokada apata log wela inna userwa neh edit karanna ona
        return this.userService.getUser(this.authService.decodedToken.nameid).catch(error => {
            this.alertify.error('Problem n retrieving data');
            this.router.navigate(['/members']);
            return Observable.of(null);
            //catch kalath observable ekakma pita wena widiyata tyenna ona aniwaryen
            //mokada return wenna ona observable ekak neh
        })

    }

}