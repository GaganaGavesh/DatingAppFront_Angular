import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/_models/Pagination';
import { User } from '../../_models/User';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users : User[];//meka update wena hama parakama automatically HTML template eka update wenawa
  pagination: Pagination;

  constructor(private userService: UserService, private alertify: AlertifyService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    //this.loadUsers();

  this.route.data.subscribe(data => {
    this.users = data['users'].result;
    this.pagination = data['users'].pagination;
  });
  }

  //this method loads next batch of users
  loadUsers(){
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(
      response => {
        this.users = response.result;
        this.pagination = response.pagination;
      }, error => {
        this.alertify.error(error);
      }
    )
  }

  pageChanged(event: any): void {
    // console.log('Page changed to: ' + event.page);
    // console.log('Number items per page: ' + event.itemsPerPage);
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  // loadUsers(){
  //   this.userService.getUsers().subscribe((users : User[])=> {
  //     this.users = users;
  //   }, error =>{
  //     this.alertify.error(error);
  //   });
  // }
}
