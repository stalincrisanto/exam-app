import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public user = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.userName == '' || this.user.userName == null) {
      alert('User is required');
    }

    //addUser: userService
    this.userService.addUser(this.user).subscribe(
      (data) => {
        //success
        console.log(data),
        alert('User created successfully');
      },
      (error) => {
        //error
        console.log(error);
        alert('Ups ! something went wrong');
      }
    )
  }
}
