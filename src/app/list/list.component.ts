import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '../_models/Pagination';
import { User } from '../_models/User';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: User[];
  pagination: Pagination
  likesParam: string;

  constructor(
    private authService: AuthService, 
    private userService: UserService, 
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data =>{
      //route rkr data enawa, e data tynne key value paires widiyata, resolver eken eka return eka access karanna pluwan 
      //key eka haraha thama, ex ['users']
      //basicaly resolver eke return eka enne route data wala ['users'] kiyana key eka yatathata
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    })
    this.likesParam = 'Likers'
  }

  //this method loads next batch of users
  loadUsers(){
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam).subscribe(
      response => {
        this.users = response.result;
        this.pagination = response.pagination;
      }, error => {
        this.alertify.error(error);
      }
    )
    console.log(this.likesParam);
  }

  pageChanged(event: any): void {
    // console.log('Page changed to: ' + event.page);
    // console.log('Number items per page: ' + event.itemsPerPage);
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

}
