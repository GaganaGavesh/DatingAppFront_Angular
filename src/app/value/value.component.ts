import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  values: any;

  constructor(private http: Http) { }

  ngOnInit(): void {
    //this.getValues();
  }

  // getValues(){
  //   this.http.get('http://localhost:50100/api/values').subscribe(
  //     res => {
  //       this.values = res.json();//Attempts to return body as parsed JSON object, or raises an exception
  //       console.log(this.values);
  //     }, error=>{
  //       console.log(error);
  //     });
  // }

}
