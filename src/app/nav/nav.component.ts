import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model : any = {};//this is empty object
  @ViewChild('loginForm') signupForm: NgForm

  constructor(private authService: AuthService) { }

  ngOnInit(){
    //meka wenne eka parai
    console.log(this.model);

  }

  login(){
    this.authService.login(this.model).subscribe(data=>{
      console.log("Logged in successfully");
    }, error=>{
      console.log("Failed to login");
    }
    );
    console.log(this.model);
    this.signupForm.reset();
  }

}
