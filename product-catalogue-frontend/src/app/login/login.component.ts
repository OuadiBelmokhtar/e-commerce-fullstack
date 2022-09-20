import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }
  // click sur button login
  onLogin(authenticationFormFields: any) {
    console.log("authenticationFormFields");
    console.log(authenticationFormFields);
    this.authenticationService.login(authenticationFormFields);
   
    //if (this.authenticationService.isAuthenticated()) {
//      this.router.navigateByUrl('frontoffice-products-grid/2/0'); // naviguer vers les products selectionnes
  //  }
  }

}
