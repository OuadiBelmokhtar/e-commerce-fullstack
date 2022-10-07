import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { User } from '../models/User.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  

  private _jwtAuthToken: any;// contient access-token et refresh-token
  public username: any = "";
  public roles: any = [];

  /*
    private users = [
      { username: 'admin', password: '1234', roles: ['ADMIN', 'USER'] },
      { username: 'user1', password: '1234', roles: ['USER'] },
      { username: 'user2', password: '1234', roles: ['USER'] }
    ];
  */
  constructor(private httpClient: HttpClient, private router:Router) { }

  // AuthenticationService.login()
  login(user: User) {
    this.httpClient.post<string>(GlobalService.HOST + "/login", user)
      .subscribe(response => {
        this._jwtAuthToken = response;
        this.saveJwtAuthTokenToLocalStorage();
        console.log("this.authToken after save");
        console.log(this._jwtAuthToken);
        this.parseJwtAuthTokenAndInitUsernameRoles();
        if (this.isAuthenticated()) {
          
          this.router.navigateByUrl('frontoffice-products-grid/1/0');// naviguer vers les products selectionnes
          //let currentUrl=this.router.url;
          //this.router.navigateByUrl('/', {skipLocationChange:true}).then(()=>{this.router.navigate(['frontoffice-products-grid/1/0'])});
          location.reload();// recharger la page
        }
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


  public saveJwtAuthTokenToLocalStorage() {
    if (this._jwtAuthToken)
      localStorage.setItem('jwtAuthToken', btoa(JSON.stringify(this._jwtAuthToken)));
  }
  // invoqué ds AppComponent.ngOnInit() lors d'actualisation de la page
  public loadAndGetJwtAuthTokenFromLocalStorage() {
    let encodedToken = localStorage.getItem('jwtAuthToken');
    //console.log("lToken");
    // console.log(lToken);
    if (encodedToken) {
      // convertir de string à JSON
      let decodedToken = JSON.parse(atob(encodedToken));
      // extraire username+roles seulement, vu que generalement un token contient autres infos (date expiration, ...)
      this._jwtAuthToken = decodedToken;
      return this._jwtAuthToken;
    }
  }

  // Extract and get access-token from authToken
  public getJwtAccessToken() {
    console.log("**getAccessToken()")
    let authToken = this.loadAndGetJwtAuthTokenFromLocalStorage();
    let accessToken: string = authToken['access-token'];
    console.log("getAccessToken().access-token"); console.log(accessToken);
    return accessToken;
  }

  // Extract and get refresh-token from authToken
  public getJwtRefreshToken() {
    let authToken = this.loadAndGetJwtAuthTokenFromLocalStorage();
    console.log("refresh-token"); console.log(authToken['refresh-token']);
    return authToken['refresh-token'];
  }

  // invoqué au moment du login() pour initialiser les vars this.username et this.roles des le login()
  // Noter bien que pour recuperer le contenu du jwtToken on a pas besoin du secret. Ce dernier est requis 
  // seulment ds le backend pr vérifier la validité du token via la signature.
  public parseJwtAuthTokenAndInitUsernameRoles() {
    let rawJwtAccessToken = this.getJwtAccessToken();
    let jwtHelper = new JwtHelperService();
    let decodedJwtAccessToken = jwtHelper.decodeToken(rawJwtAccessToken);
    this.username = decodedJwtAccessToken.sub; // recup le claim standard subject
    this.roles = decodedJwtAccessToken.roles; // recup le claim roles
    console.log("parseJwtAuthToken().username"); console.log(this.username);
    console.log("parseJwtAuthToken().roles"); console.log(this.roles);

  }

  public sendRefreshTokenAndGetNewAccessToken(){
    let refreshToken=this.getJwtRefreshToken();
    let authorizationHeader=new HttpHeaders({'Authorization':'Bearer '+refreshToken});
    return this.httpClient.get(GlobalService.HOST+"/refreshToken", {headers:authorizationHeader});
  }

  public isJwtExpired() {
    let rawJwtAccessToken = this.getJwtAccessToken();
    let jwtHelper = new JwtHelperService();
    return jwtHelper.isTokenExpired(rawJwtAccessToken);
  }

  public isAdmin(): boolean {
    let isAdmin: boolean = false;
    if (this.username && this.roles) {
      isAdmin = this.roles.indexOf('ADMIN') > -1;
    }
    return isAdmin;
  }
  public isUser(): boolean {
    let isUser: boolean = false;
    if (this.username && this.roles) {
      isUser = this.roles.indexOf('USER') > -1;
    }
    return isUser;
  }

  public isAuthenticated() {
    let isUserAuthenticated = false;
    if (this.username) {
      isUserAuthenticated = true;
    }
    return isUserAuthenticated;
  }
  // invoquer ds AppComponent.onLgout()
  removeJwtAuthTokenFromLocalStorage() {
    // Supprimer le token du localStorage si existe. Sinon, on fait rien
    localStorage.removeItem('jwtAuthToken');
   
  }

  logout() {
    this.removeJwtAuthTokenFromLocalStorage();
    this._jwtAuthToken=undefined;
    this.username = undefined;
    this.roles = undefined;
  }


  public get jwtAuthToken() {
    return this._jwtAuthToken;
  }
  public set jwtAuthToken(value) {
    this._jwtAuthToken = value;
  }
}
