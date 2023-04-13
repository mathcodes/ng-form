import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  name= '';
  email= '';

  constructor() { }

  ngOnInit(): void {
    // Retrieve name and email from some source (e.g. service, API)
    // and assign them to the properties
    this.name = 'John Smith';
    this.email = 'john@example.com';
  }

}

