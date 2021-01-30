import { Component, OnInit, Input } from '@angular/core';
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
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10*1024*1024
    });

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
    }, error => {
      this.alertify.error(error);
    }
    );
  }
}