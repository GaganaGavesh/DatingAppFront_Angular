import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  value: any;

  constructor(private http: Http) { }

  ngOnInit(): void {
    this.getValues();
  }

  getValues(){
    this.http.get('http://localhost:50100/api/values').subscribe(
      res => {
        console.log(res);
      });
  }

}
