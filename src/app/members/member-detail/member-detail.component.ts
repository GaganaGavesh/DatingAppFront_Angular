import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  user : User;

  constructor(
    private userService : UserService, 
    private alertify : AlertifyService, 
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.loadUser();
  }

  //members/id
  loadUser(){
    //route is always a string, so need to parse it by putting + sign as prefix
    this.userService.getUser(+this.route.snapshot.params['id']).subscribe(
      (user : User) => {
        this.user = user;
        console.log(user.knownAs);
      },error =>{
        this.alertify.error(error);
      }
    )
  }

}
