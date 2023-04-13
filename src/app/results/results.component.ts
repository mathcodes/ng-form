import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  name = '';
  email = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('https://64378d38894c9029e8c03d0d.mockapi.io/api/ang/users/1')
      .subscribe(data => {
        this.name = data.name;
        this.email = data.email;
      });
  }
}
