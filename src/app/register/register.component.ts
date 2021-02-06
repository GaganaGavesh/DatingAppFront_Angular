import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
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
  registerFormReactive : FormGroup;

  constructor(private authService : AuthService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.registerFormReactive = new FormGroup({
      username: new FormControl('Gagana', Validators.required),
      password: new FormControl('', [
        Validators.required, 
        Validators.minLength(4), 
        Validators.maxLength(8)]),
      confirmPassword: new FormControl('', Validators.required)
    }, this.passwordMatchValidator);
  }

  passwordMatchValidator(g : FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch' : true};
  }

  register(){
    // //register method ekata ape model eka yawanawa
    // this.authService.register(this.model).subscribe((res)=>{
    //   console.log("Registration Successful");
    //   this.alertify.success("Registration Successful");
    // }, error=>{
    //   //console.log(error);
    //   this.alertify.error(error);
    // });
    // this.registerForm.reset();
    // //console.log(this.model);

    console.log(this.registerFormReactive.value);
  }

  cancel(){
    this.cancelRegister.emit(false);
    //console.log("Cancelled");
  }

}
