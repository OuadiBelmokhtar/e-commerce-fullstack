import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _authenticatedUser: any;
  private _isAuthenticated: boolean = false;
  private _token: any;
  private _jwtAccessToken: string = "";

  private users = [
    { username: 'admin', password: '1234', roles: ['ADMIN', 'USER'] },
    { username: 'user1', password: '1234', roles: ['USER'] },
    { username: 'user2', password: '1234', roles: ['USER'] }
  ];

  constructor(private httpClient: HttpClient) { }

  // AuthenticationService.login()
  login(user:User) {
    //login(username: string, password: string) {
    // TODO: chercher comment envoyer un objet JSON au lieu d'un string
    //this.httpClient.post<string>(GlobalService.HOST + "/login", "username=" + username + "&password=" + password,{ headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) })
    this.httpClient.post<string>(GlobalService.HOST + "/login", "username=" + user.username + "&password=" + user.password,{ headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) })
      .subscribe(response => {
        this._jwtAccessToken = response;
        console.log(this._jwtAccessToken);
      }, err => {
        console.log(err);
      })
  }


  loginWithStaticArray(username: string, password: string) {
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
      // convertir authenticatedUser de JSON à string
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
      // convertir de string à JSON
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
