import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _authenticatedUser: any;
  private _isAuthenticated: boolean = false;
  private _token: any;

  private users = [
    { username: 'admin', password: '1234', roles: ['ADMIN', 'USER'] },
    { username: 'user1', password: '1234', roles: ['USER'] },
    { username: 'user2', password: '1234', roles: ['USER'] }
  ];

  constructor() { }

  // AuthenticationService.login()
  login(username: string, password: string) {
    let foundUser;
    this.users.forEach(user => {
      if (user.username == username && user.password == password) {
        foundUser = user;
      }
    });
    if (foundUser) {
      // retenir l'utilisateur authentifié
      this.authenticatedUser = foundUser;
      this.isAuthenticated = true;
      // créer un token pr le sauvegarder ds localStorage
      this.token = btoa(JSON.stringify({ 'username': this.authenticatedUser.username, 'roles': this.authenticatedUser.roles }));
    } else {
      this.authenticatedUser = undefined;
      this.isAuthenticated = false;
      this.token = undefined;
      console.log("Username ou password incorrects!");
    }
  }

  public isAdmin(): boolean {
    if (this.authenticatedUser) {
      if (this.authenticatedUser.roles.indexOf('ADMIN') > -1) {
        return true;
      }
    }
    return false;
  }

  public saveAuthenticatedUserTokenToLocalStorage() {
    if (this.authenticatedUser)
      localStorage.setItem('authenticationToken', this.token);
  }
  // invoquer ds AppComponent.ngOnInit() lors d'actualisation de la page
  public loadAndGetAuthenticatedUserTokenFromLocalStorage() {
    let encodedToken = localStorage.getItem('authenticationToken');
    //console.log("lToken");
    // console.log(lToken);
    if (encodedToken) {
      let decodedToken = JSON.parse(atob(encodedToken));
      // extraire username+roles seulement, vu que generalement un token contient autres infos (date expiration, ...)
      this.authenticatedUser = { username: decodedToken.username, roles: decodedToken.roles };
      this.isAuthenticated = true;
      this.token = encodedToken;
      return this.authenticatedUser;
    }
  }
  // invoquer ds AppComponent.onLgout()
  removeAuthenticatedUserTokenFromLocalStorage() {
    // Supprimer le token du localStorage si existe. Sinon, on fait rien
    localStorage.removeItem('authenticationToken');
    this.authenticatedUser = undefined;
    this.isAuthenticated = false;
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
