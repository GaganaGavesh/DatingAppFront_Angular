import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { DateService } from 'src/app/_services/date.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  user : User;
  //completed : boolean = false;

  //ngx gallery module
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  timeAgo : string;

  constructor(
    private userService : UserService, 
    private alertify : AlertifyService, 
    private route : ActivatedRoute,
    private getTimeAgo : DateService) { }

  ngOnInit(): void {
    //sthis.loadUser();

    //An observable of the static and resolved data of this route.
    this.route.data.subscribe(data => {
      this.user = data['user'];//route eke data wala user kiyana name eka yatathe thama ape resolver eken ena data tika 
      //thiyenne
      this.timeAgo = this.getTimeAgo.getTimeAgo(this.user.lastActive);
    });

    //mekata ganne NgxGalleryOptions kiyana class eke object
    //{ } athule tyna content ekinekata wenas wenna pluwn
    //mkda me NgxGalleryOptions class eke optional field thama sampurnen ma wage etynne
    // this.galleryOptions = [
    //   {
    //     width: '600px',
    //     height: '400px',
    //     //thumbnailsColumns: 4,
    //     imageAnimation: NgxGalleryAnimation.Slide
    //   },//me wage {} thawa enna pluwan, me wage option dala
    // ];
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent : 100,
        preview : false,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,

      }
    ];
    this.galleryImages = this.getImages();
    // this.galleryImages = [
      
    //     {
    //       small: 'https://randomuser.me/api/portraits/women/11.jpg',
    //       medium: 'https://randomuser.me/api/portraits/women/11.jpg',
    //       big: 'https://randomuser.me/api/portraits/women/11.jpg'
    //     },
    //     {
    //       small: 'https://randomuser.me/api/portraits/women/33.jpg',
    //       medium: 'https://randomuser.me/api/portraits/women/33.jpg',
    //       big: 'https://randomuser.me/api/portraits/women/33.jpg'
    //     },
    //     {
    //       small: 'https://randomuser.me/api/portraits/women/44.jpg',
    //       medium: 'https://randomuser.me/api/portraits/women/44.jpg',
    //       big: 'https://randomuser.me/api/portraits/women/44.jpg'
    //     }
    //     ,
    //     {
    //       small: 'https://randomuser.me/api/portraits/women/45.jpg',
    //       medium: 'https://randomuser.me/api/portraits/women/45.jpg',
    //       big: 'https://randomuser.me/api/portraits/women/45.jpg'
    //     }
    //     ,
    //     {
    //       small: 'https://randomuser.me/api/portraits/women/46.jpg',
    //       medium: 'https://randomuser.me/api/portraits/women/46.jpg',
    //       big: 'https://randomuser.me/api/portraits/women/46.jpg'
    //     }
    //     ,
    //     {
    //       small: 'https://randomuser.me/api/portraits/women/47.jpg',
    //       medium: 'https://randomuser.me/api/portraits/women/47.jpg',
    //       big: 'https://randomuser.me/api/portraits/women/47.jpg'
    //     },
    //     {
    //       small: 'https://randomuser.me/api/portraits/women/48.jpg',
    //       medium: 'https://randomuser.me/api/portraits/women/48.jpg',
    //       big: 'https://randomuser.me/api/portraits/women/48.jpg'
    //     },
    //     {
    //       small: 'https://randomuser.me/api/portraits/women/49.jpg',
    //       medium: 'https://randomuser.me/api/portraits/women/49.jpg',
    //       big: 'https://randomuser.me/api/portraits/women/49.jpg'
    //     },
    //     {
    //       small: 'https://randomuser.me/api/portraits/women/50.jpg',
    //       medium: 'https://randomuser.me/api/portraits/women/50.jpg',
    //       big: 'https://randomuser.me/api/portraits/women/50.jpg'
    //     }
    // ];
  }


  //members/id
  // loadUser(){
  //   //route is always a string, so need to parse it by putting + sign as prefix
  //   this.userService.getUser(+this.route.snapshot.params['id']).subscribe(
  //     (user : User) => {
  //       this.user = user;
  //       console.log(user.knownAs);
  //     },error =>{
  //       this.alertify.error(error);
  //     },()=>{
  //       this.completed = true;
  //     }
  //   )
  // }

  getImages() : NgxGalleryImage[] {
    //NgxGalleryImage object array ekak thama eliyata danna ona
    const imageUrls = [];
    for(let i = 0; i < this.user.photos.length; i++){
      imageUrls.push({
        small : this.user.photos[i].url,
        medium : this.user.photos[i].url,
        big : this.user.photos[i].url,
        description : this.user.photos[i].description
        });
    }
    return imageUrls;
  }

}
