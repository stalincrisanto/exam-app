import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';

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

  constructor(private snack: MatSnackBar, private login: LoginService) { }

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
    },
    (error) => {
      console.log(error);
    })
  }

}
