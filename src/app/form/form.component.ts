import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  name: string = '';
  email: string = '';
  city: string = '';
  state: string = '';
  team: string = '';
  selectedTeam: string = 'A';


  constructor(private http: HttpClient) { }

  onSubmit(): void {
    const endpoint = 'https://64378d38894c9029e8c03d0d.mockapi.io/api/ang/users';
    const data = {
      name: this.name,
      email: this.email,
      city: this.city,
      state: this.state,
      team: this.selectedTeam,
    };
    this.http.post(endpoint, data)
      .subscribe(
        (response: any) => {
          console.log('Form data submitted successfully:', response);
          if (response.team === 'A') {
            this.teamAUsers.push(response);
          } else if (response.team === 'B') {
            this.teamBUsers.push(response);
          }
        },
        (error) => {
          console.error('Error submitting form data:', error);
        }
      );
  }



  teamAUsers: any[] = [];
  teamBUsers: any[] = [];

}
