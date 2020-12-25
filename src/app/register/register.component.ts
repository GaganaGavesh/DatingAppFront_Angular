import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';
//import { EventEmitter } from 'events';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() valuesFromHome : any;
  @Output() cancelRegister = new EventEmitter();

  model : any = {};
  @ViewChild('registerForm') registerForm: NgForm; //to get the form details

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  register(){
    //register method ekata ape model eka yawanawa
    this.authService.register(this.model).subscribe((res)=>{
      console.log("Registration Successful");
    }, error=>{
      console.log(error);
    });
    this.registerForm.reset();
    //console.log(this.model);
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log("Cancelled");
  }

}
