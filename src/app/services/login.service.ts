import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //current user: which is loggedin
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token
  public generateToken (loginData: any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  //login user: set token in localstorage
  public loginUser(token: string){
    localStorage.setItem('token',token);
    return true;
  }

  public isLoggedIn(){
    let tokenStorage = localStorage.getItem('token');
    if(tokenStorage===undefined||tokenStorage===''||tokenStorage===null){
      return false;
    } else {
      return true;
    }
  }

  //logout
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUser(){
    let userStorage = localStorage.getItem('user');
    if(userStorage!==null){
      return JSON.parse(userStorage);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
