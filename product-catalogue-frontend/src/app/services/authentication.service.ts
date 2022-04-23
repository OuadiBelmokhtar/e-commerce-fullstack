import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _authenticatedUser: any;
  private _isAuthenticated: boolean = false;
  private _token:any;

  private users = [
    { username: 'admin', password: '1234', roles: ['ADMIN', 'USER'] },
    { username: 'user1', password: '1234', roles: ['USER'] },
    { username: 'user2', password: '1234', roles: ['USER'] }
  ];
  
  constructor() { }

  login(username: string, password: string) {
    let foundUser;
    this.users.forEach(user => {
      if (user.username == username && user.password == user.password) {
        foundUser = user;
      }
    });
    if (foundUser) {
      // retenir l'utilisateur authentifié
      this.authenticatedUser = foundUser;
      this.isAuthenticated = true;
      // créer un token pr le sauvegarder ds localStorage
      this.token={'username':this.authenticatedUser.username, 'roles':this.authenticatedUser.roles};
      
    }else{
      this.authenticatedUser=undefined;
      this.isAuthenticated=false;
      console.log("Username ou password incorrects!");
    }
  }

  public isAdmin():boolean{
    if(this.authenticatedUser){
      if(this.authenticatedUser.roles.indexOf('ADMIN')>-1){
        return true;
      }
    }
    return false;
  }

  public get authenticatedUser(): any {
    return this._authenticatedUser;
  }
  public set authenticatedUser(value: any) {
    this._authenticatedUser = value;
  }
  public get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
  public set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }
  public get token() {
    return this._token;
  }
  public set token(value) {
    this._token = value;
  }
}
