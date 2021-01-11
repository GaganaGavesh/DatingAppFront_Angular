import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  //each card component contains a single member.
  @Input() user : User;
  
  constructor() { }

  ngOnInit(): void {
  }

}
