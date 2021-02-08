import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/User';
import { object } from 'underscore';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
//import { EventEmitter } from 'events';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() valuesFromHome : any;
  @Output() cancelRegister = new EventEmitter();

  //model : any = {};//me empty object ekak initialize karana hati
  user : User;
  @ViewChild('registerForm') registerForm: NgForm; //to get the form details
  registerFormReactive : FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;


  constructor(
    private authService : AuthService, 
    private alertify: AlertifyService,
    private fb : FormBuilder,
    private router: Router) { }

  //Angular wala reactive forms hadanna widi 2k tynawa 
  //1) FormGroup ekak hadanla ekata FormControl dana eka
  //2) FormBuilder eka use karanna pluwan, meka FOrmGroup eke simplify karapu ersion ekak wage ekak, 
  /////new keyword ehema danna ona ne
  ngOnInit(): void {
    // this.registerFormReactive = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [
    //     Validators.required, 
    //     Validators.minLength(4), 
    //     Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', Validators.required)
    // }, this.passwordMatchValidator);
    this.bsConfig = { containerClass: 'theme-red' };
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerFormReactive = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [
        Validators.required, 
        Validators.minLength(4), 
        Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    },{ validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g : FormGroup){
    return g.get('password').value === g.get('confirmPassword').value  ? null : {'mismatch' : true};
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
    // //console.log(this.model); gaveshgamage@gmail.com
    if(this.registerFormReactive.valid){
      this.user = Object.assign({}, this.registerFormReactive.value);
    }
    console.log(this.registerFormReactive.value);
    this.authService.register(this.user).subscribe(
        ()=>{//callback function eka call wenawa observable eka athuledi
          console.log("Registration Successful");
          this.alertify.success("Registration Successful");
        }, error =>{
          this.alertify.error(error);
        }, () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(['/members']);
          });
        }
    );
  }

  cancel(){
    this.cancelRegister.emit(false);
    //console.log("Cancelled");
  }

}
