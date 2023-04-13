import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  name: string;
  email: string;

    city: string;
    state: string;

}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  users: User[] = [];
  editing = false;
  editUser: User = {} as User;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<User[]>('https://64378d38894c9029e8c03d0d.mockapi.io/api/ang/users/').subscribe((data) => {
      console.log(data);
      this.users = data;
    });
  }

  editSelectedUser(user: User) {
    this.editUser = { ...user };
    this.editing = true;
  }

  cancelEdit() {
    this.editUser = {} as User;
    this.editing = false;
  }

  saveUser() {
    // Find the index of the editing user in the users array
    const index = this.users.findIndex((user) => user.id === this.editUser.id);
    console.log(index);
    // Update the user object in the users array
    this.users[index] = this.editUser;
    console.log(this.users[index]);
    // Reset the editing user object and toggle the editing state
    this.editUser = {} as User;
    this.editing = false;
  }

  deleteUser(user: User) {
    // Find the index of the user in the users array
    const index = this.users.findIndex((u) => u.id === user.id);

    // Remove the user from the users array
    this.users.splice(index, 1);
  }
}
