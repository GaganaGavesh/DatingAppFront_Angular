import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  //each card component contains a single member.
  @Input() user : User;
  
  constructor(
    private authService: AuthService,
    private userService : UserService, 
    private alertify : AlertifyService) { }

  ngOnInit(): void {
  }

  sendLike(recipientId: number){
    this.userService.sendLike(this.authService.decodedToken.nameid, recipientId).subscribe(data =>{
      this.alertify.success('You have liked ' + this.user.knownAs);//users la eka eka gane neh 
      //ekata for loolp eka haraha load wenne, e nisa eka user kenekge details ganna eka amaru nee, 
      //kelinma user. kiyala danawa
    }, error => {
      this.alertify.error(error);
    });
  }

}
