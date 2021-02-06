import { Injectable } from '@angular/core';

declare let alertify: any;//methana hariyatama alertify wennama ona mko api methenta ganne library ekee
//originate wela tyna name ekak

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  //confrm kiyana metod eken ganne message kiyala string ekakui okCallback iyala function ekakyi
  //meka anonymous function ekak unata aulak ne 
  //alertify.confirm kiyana eke tynawa functioon ekak eka call unama ape callback function eka cal wenawa
  //eka call unama thama callbackeka athule wena ewa tika wenne. e scene eka tynne photoedit component eke
  confirm(message: string, okCallback: ()=> any){
    alertify.confirm(message, function(e){
      if(e){
        okCallback();
      }else{

      }
    });
  }

  error(message: string){
    alertify.error(message);
  }

  success(message: string){
    alertify.success(message);
  }

  message(message: string){
    alertify.message(message);
  }

  warning(message: string){
    alertify.warning(message);
  }
}
