import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { User } from './_models/User';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'DatingAppSPA';
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(){
    //meka damme token eka tyna welawatta userge name eka ganne nathi eka hadanna
    //mokada methanama damme ?? 
    //me component eka thama highest level component eka
    //refresh waladi aniwa wada karanawa 
    //methendima check karala token ekak tyenam authservice eke variable ekata dagannawa
    //ethakota refresh waladi aniwa token name eka ganna than walata me name eka ganna pluwan aulak nathuwa
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if(token){
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if(user){
      this.authService.currentUser = user;
      //refresh kalama user default photo eka nathi wena ekata solution ekak
      if(this.authService.currentUser.photoUrl != null){
        this.authService.changeMemberPhoto(user.photoUrl);
      } else {
        this.authService.changeMemberPhoto('../assets/user.jpg');
      }
      this.router.navigate(['/members']);
    }
  }
}
