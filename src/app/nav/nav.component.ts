import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model : any = {};//this is empty object
  @ViewChild('loginForm') signupForm: NgForm

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit(){
    //meka wenne eka parai
    //console.log(this.model);

  }

  login(){
    this.authService.login(this.model).subscribe(data=>{
      //console.log("Logged in successfully");
      this.alertify.success("Logged in successfully");
    }, error=>{
      //console.log("Failed to login");
      console.log(error);
      this.alertify.error(error);
    }
    );
    console.log(this.model);
    this.signupForm.reset();
  }

  loggedIn(){
    //const token = localStorage.getItem('token');//Returns the current value associated with the given key, 
    //or null if the given key does not exist in the list associated with the object.
    // if(token){
    //   return true;
    // }else{
    //   return false;
    // }
    return this.authService.loggedIn();
  }

  logOut(){
    this.authService.userToken = null;
    localStorage.removeItem('token');
    //console.log("User logged out");
    this.alertify.message("User logged out");
  }

}
