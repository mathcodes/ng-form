import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User { // this is a TypeScript interface that is used to define the structure of an object
  id: number;
  name: string;
  email: string;
  city: string;
  state: string;
}

@Component({ // @Component is a decorator that is used to define the metadata of a component
  //  NOTE: a decorator is a function that is used to modify the behavior of a class, method, or property
  selector: 'app-results', // this is the selector that is used to reference the component in the HTML
  templateUrl: './results.component.html', // this is the path to the HTML template file
  styleUrls: ['./results.component.css'] // this is the path to the CSS file
})

export class ResultsComponent implements OnInit {
  users: User[] = []; // this is a type declaration for the users array stating that it is an array of User objects
  editing = false; // this is a boolean to toggle the edit form, it is a type declaration for the editing state
  editUser: User = {} as User; // this is a type declaration for the editing user stating that it is an object with the properties of a User. The syntax {} as User is used to initialize an empty object of type User, which is then assigned to editUser

  constructor(private http: HttpClient) {} //

  ngOnInit(): void { // this is a lifecycle hook that is called when the component is initialized
    // here we are making a GET request to the mock API endpoint to retrieve the users
    // .http is a property of the HttpClient class that is used to make HTTP requests
    // .get is a method of the HttpClient class that is used to make GET requests
    // <User[]> is a type assertion that tells the compiler that the data returned from the GET request is an array of User objects
    // 'https://64378d38894c9029e8c03d0d.mockapi.io/api/ang/users/' is the endpoint to the mock API
    // .subscribe is a method of the HttpClient class that is used to subscribe to the response of the GET request
    // (data) => {} is an arrow function that is used to handle the response of the GET request
    this.http.get<User[]>('https://64378d38894c9029e8c03d0d.mockapi.io/api/ang/users/').subscribe((data) => {
      console.log(data);
      // here we are assigning the data returned from the GET request to the users array
      this.users = data;
    });
  }

  editSelectedUser(user: User) { // this is a method that is called when the edit button is clicked
    // here we are assigning the user object that was passed into the method to the editUser object
    // { ...user } is a spread operator that is used to create a copy of the user object
    //  NOTE: spread operators are used to create a copy of an object or array, otherwise the editUser object would be a reference to the user object and any changes made to the editUser object would also be made to the user object
    this.editUser = { ...user };
    // here we are toggling the editing state
    this.editing = true;
  }

  cancelEdit() { // this is a method that is called when the cancel button is clicked
    // here we are resetting the editing user object and toggling the editing state
    this.editUser = {} as User;
    // here we are toggling the editing state
    this.editing = false;
  }

  saveUser() { // this is a method that is called when the save button is clicked
    // Find the index of the editing user in the users array
    const index = this.users.findIndex((user) => user.id === this.editUser.id);
    console.log(index);
    // Update the user object in the users array
    this.users[index] = this.editUser;
    // Log the updated user object
    console.log(this.users[index]);
    // Reset the editing user object and toggle the editing state
    this.editUser = {} as User;
    // here we are toggling the editing state to false which hides the edit form
    this.editing = false;
  }

  deleteUser(user: User) { // finally we have a method that is called when the delete button is clicked
    // Find the index of the user in the users array
    //  NOTE this is different from the index of the editing user or saving because we are finding the index of the user that is passed into the method: user: User
    // this refers to the current instance of the class which is the ResultsComponent class
    // .users is a property of the ResultsComponent class that is an array of User objects
    // .findIndex is a method of the Array class that is used to find the index of an object in an array
    // (u) => u.id === user.id is an arrow function that is used to find the index of the user object that has the same id as the user object that was passed into the method
    const index = this.users.findIndex((u) => u.id === user.id);

    // Remove the user from the users array
    // this refers to the current instance of the class which is the ResultsComponent class
    // .users is a property of the ResultsComponent class that is an array of User objects
    // .splice is a method of the Array class that is used to remove an object from an array
    // index is the index of the user object in the users array
    // 1 is the number of objects to remove from the users array
    this.users.splice(index, 1);
  }
}
