import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: string;
  name: string;
  email: string;
  city: string;
  state: string;
  team: string;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  teamAUsers: User[] = [];
  teamBUsers: User[] = [];
  selectedUser: User | null = null;
  isEditing = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const endpoint = 'https://64378d38894c9029e8c03d0d.mockapi.io/api/ang/users';

    this.http.get<User[]>(endpoint).subscribe(
      (response: User[]) => {
        this.teamAUsers = response.filter(u => u.team === 'A');
        this.teamBUsers = response.filter(u => u.team === 'B');
      },
      (error) => {
        console.error('Error retrieving users:', error);
      }
    );


  }

  editUser(user: User): void {
    console.log('Editing user:', user);
    this.selectedUser = user;
    this.isEditing = true;
  }

  deleteUser(user: User): void {
    console.log('Deleting user:', user);
    const endpoint = `https://64378d38894c9029e8c03d0d.mockapi.io/api/ang/users/${user.id}`;
    this.http.delete(endpoint).subscribe(
      () => {
        if (user.team === 'A') {
          this.teamAUsers = this.teamAUsers.filter(u => u.id !== user.id);
        } else if (user.team === 'B') {
          this.teamBUsers = this.teamBUsers.filter(u => u.id !== user.id);
        }
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  cancelEdit(): void {
    this.selectedUser = null;
    this.isEditing = false;
  }



  updateUser(): void {
    if (this.selectedUser && this.selectedUser.id) {
      const endpoint = `https://64378d38894c9029e8c03d0d.mockapi.io/api/ang/users/${this.selectedUser.id}`;
      this.http.put<User>(endpoint, this.selectedUser).subscribe(
        (response: User) => {
          console.log('User updated:', response);
          if (response.team === 'A') {
            this.teamAUsers = this.teamAUsers.map(u => u.id === response.id ? response : u);
          } else {
            this.teamBUsers = this.teamBUsers.map(u => u.id === response.id ? response : u);
          }
          this.selectedUser = null;
          this.isEditing = false;
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      console.error('Cannot update user, user or user ID is missing.');
    }
  }




  selectUser(user: User): void {
    this.selectedUser = user
  }

}
