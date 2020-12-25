import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  values : any;
  constructor(private http : Http ) { }

  ngOnInit(): void {
    this.getValues();
  }

  registerToggle(){
    this.registerMode = true;
  }

  getValues(){
    this.http.get('http://localhost:50100/api/values').subscribe(
      res => {
        this.values = res.json();//Attempts to return body as parsed JSON object, or raises an exception
        console.log(this.values);
      }, error=>{
        console.log(error);
      });
  }

  cancelRegisterMode(registerMode : boolean){
    this.registerMode = registerMode;

  }

}
