import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  name = '';
  email = '';
  message = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const endpoint = 'https://64378d38894c9029e8c03d0d.mockapi.io/api/ang/users';
    const data = {
      name: this.name,
      email: this.email,
      message: this.message
    };
    this.http.post(endpoint, data)
      .subscribe(
        (response) => {
          console.log('Form data submitted successfully:', response);
        },
        (error) => {
          console.error('Error submitting form data:', error);
        }
      );
  }
}