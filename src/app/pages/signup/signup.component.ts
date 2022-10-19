import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
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

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.userName == '' || this.user.userName == null) {
      this._snackBar.open('User name is required!!', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',

      });
      return;
    }

    //addUser: userService
    this.userService.addUser(this.user).subscribe(
      (data) => {
        //success
        //console.log(data), alert('User created successfully');
        Swal.fire('Success','User is registered','success');
      },
      (error) => {
        //error
        this._snackBar.open('Something went wrong', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      }
    );
  }
}
