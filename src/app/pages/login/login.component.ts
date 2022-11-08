import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    userName : '',
    password: ''
  }

  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.loginData.userName.trim()===''|| this.loginData.userName===null){
      this.snack.open('Username is required','',{
        duration: 3000
      })
      return;
    }
    if(this.loginData.password.trim()===''|| this.loginData.password===null){
      this.snack.open('password is required','',{
        duration: 3000
      })
      return;
    }
    this.login.generateToken(this.loginData).subscribe((data: any) => {
      console.log("toke--->",data);

      //login
      this.login.loginUser(data.token);

      this.login.getCurrentUser().subscribe((user: any) => {
        this.login.setUser(user);
        if(this.login.getUserRole() == 'ADMIN'){
          //admin dashboard
          // window.location.href = '/admin';
          this.router.navigate(['admin']);
        } else if (this.login.getUserRole() == 'NORMAL') {
          //normal user dashboard
          // window.location.href = '/user-dashboard';
          this.router.navigate(['user-dashboard']);
        } else {
          this.login.logout();
        }
      })
    },
    (error) => {
      console.log(error);
      this.snack.open("Invalid Details",'',{
        duration: 3000
      })
    })
  }

}
