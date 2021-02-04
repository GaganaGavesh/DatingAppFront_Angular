import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { throwError } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import * as _ from 'underscore'; //* is for specify everything, everything represents as _

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos : Photo[];
  uploader:FileUploader;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain : Photo;
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  constructor(
    private authService : AuthService, 
    private userService : UserService,
    private alertify : AlertifyService) { }

  ngOnInit(): void {
    this.initializeUploader();
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  initializeUploader() : void {
    //page eka initialize weddi FileUploader instance ekak hadagannawa
    //ekee fields configure karanawa
    //ita passe template ekee tynawa uploader.uploadAll() kiyala method ekak eka fire wenawaa Upload kiyana button click ekata
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10*1024*1024
    });

    //upload wela ena response eka thama mekata enne,ethanin thama ape photo array ekata aluth photo eka update karanne
    this.uploader.onSuccessItem = (item, response, status, headers) =>{
      if(response){
        const res : Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        }
        this.photos.push(photo);
      }
    };
  }

  setMainPhoto(photo: Photo){
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(()=> {
      // let i = 0;
      // for(i;i<this.photos.length;i++){
      //   if(this.photos[i].isMain){
      //     this.currentMain = this.photos[i];
      //     this.currentMain.isMain = false;
      //     photo.isMain = true;
      //   }
      // }
      this.currentMain = _.findWhere<Photo[]>(this.photos, {isMain : true});
      this.currentMain.isMain = false;
      photo.isMain =true;
      //this.getMemberPhotoChange.emit(photo.url);//BehavioraSubject eka use karana nisa meka ona ne
      this.authService.changeMemberPhoto(photo.url);
      this.authService.currentUser.photoUrl = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));//refresh wenakota user change wenawa
      //local storage ekr user change kale nathnam. photoUrl eka update karapu user object ekak ayema 
      //local storage eke save karanawa
    }, error => {
      this.alertify.error(error);
    }
    );
  }
}
