import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public authenticatedUser!:User; // a supprimer après avoir pu recuperer le user authentifié via JWT
  private _isAuthenticated: boolean = false;
  private _authToken: any;// contient access-token et refresh-token
 
/*
  private users = [
    { username: 'admin', password: '1234', roles: ['ADMIN', 'USER'] },
    { username: 'user1', password: '1234', roles: ['USER'] },
    { username: 'user2', password: '1234', roles: ['USER'] }
  ];
*/
  constructor(private httpClient: HttpClient) { }

  // AuthenticationService.login()
  login(user:User) {
    console.log("loginUser: ");
    console.log(user);
    this.httpClient.post<string>(GlobalService.HOST + "/login",user)
      .subscribe(response => {
        this._authToken = response;
        this.isAuthenticated=true;
        
        this.saveAuthTokenToLocalStorage();
        console.log("this.authToken after save");
        console.log(this._authToken);
        this.loadAndGetAuthTokenFromLocalStorage();
        console.log("this._authToken after load");
        console.log(this._authToken);
        this.getAccessToken();
      }, err => {
        console.log(err);
      });
  }

/*
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
*/
  public isAdmin(): boolean {
   
    return false;
  }

  public saveAuthTokenToLocalStorage() {
    if (this._authToken)
      localStorage.setItem('authToken', btoa(JSON.stringify(this._authToken)));
  }
  // invoquer ds AppComponent.ngOnInit() lors d'actualisation de la page
  public loadAndGetAuthTokenFromLocalStorage() {
    let encodedToken = localStorage.getItem('authToken');
    //console.log("lToken");
    // console.log(lToken);
    if (encodedToken) {
      // convertir de string à JSON
      let decodedToken = JSON.parse(atob(encodedToken));
      // extraire username+roles seulement, vu que generalement un token contient autres infos (date expiration, ...)
    
      this.isAuthenticated = true;
      this._authToken = decodedToken;
      return this._authToken;
    }
  }

  // Extract and get access-token from authToken
  public getAccessToken(){
    let authToken=this.loadAndGetAuthTokenFromLocalStorage();
    let accessToken:string="Bearer "+authToken['access-token'];
    console.log("getAccessToken().access-token");
    console.log(accessToken);
    return accessToken;
  }

    // Extract and get access-token from authToken
    public getRefreshToken(){
      let authToken=this.loadAndGetAuthTokenFromLocalStorage();
      console.log("refresh-token");
      console.log(authToken['refresh-token']);
      return authToken['refresh-token'];
    }

  // invoquer ds AppComponent.onLgout()
  removeAuthTokenFromLocalStorage() {
    // Supprimer le token du localStorage si existe. Sinon, on fait rien
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
  }

  public get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
  public set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }
  public get authToken() {
    return this._authToken;
  }
  public set authToken(value) {
    this._authToken = value;
  }
}
