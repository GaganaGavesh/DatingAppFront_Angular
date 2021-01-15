import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  user : User;

  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    //me route eka activate wenna yanawa nama onInit ekedi me route eke ena data eka thama ganne
    this.route.data.subscribe(data =>{
      this.user = data['user'];
    })
  }

}
