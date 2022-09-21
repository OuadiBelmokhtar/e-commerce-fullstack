import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { Category } from './models/Category.model';
import { Router } from '@angular/router';
import { ShowingProductsModeEnum } from './models/ShowingProductsModeEnum';
import { AuthenticationService } from './services/authentication.service';
import { CaddyService } from './services/caddy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private _categories: any;
  private _clickedCategoryId: number = 1;
  private _showingMode: ShowingProductsModeEnum = ShowingProductsModeEnum.FRONT_OFFICE;


  constructor(private categoryService: CategoryService,
    private productService: ProductService,
    private authenticationService: AuthenticationService,
    public caddyService: CaddyService,
    private router: Router) {

  }

  ngOnInit(): void {
    // pr eviter de se loger a chaque accès à l'app, on va charger jwtAuthToken du localStorage, 
    // le parser et init username+roles 
    this.authenticationService.parseJwtAuthTokenAndInitUsernameRoles();
    // charger les categories
    this.categoryService.getAllCategories()
      .subscribe(response => {
        console.log(response);
        this._categories = response;
      }, err => {
        console.log(err);
      });
  }


  onNavigateToShowSelectedProducts() {
    this.showingMode = ShowingProductsModeEnum.FRONT_OFFICE;
    this._clickedCategoryId = 0;
    this.router.navigateByUrl("frontoffice-products-grid/" + ShowingProductsModeEnum.BY_SELECTED_PRODUCTS + "/" + 0);
  }

  onNavigateToShowOnPromotionProducts() {
    this.showingMode = ShowingProductsModeEnum.FRONT_OFFICE;
    this._clickedCategoryId = 0;
    this.router.navigateByUrl("frontoffice-products-grid/" + ShowingProductsModeEnum.BY_PRODUCTS_ON_PROMOTION + "/" + 0);
  }

  onNavigateToShowProductsByCategory(categoryId: number) {
    this.showingMode = ShowingProductsModeEnum.FRONT_OFFICE;
    this.clickedCategoryId = categoryId;
    this.router.navigateByUrl("frontoffice-products-grid/" + ShowingProductsModeEnum.BY_CATEGORY + "/" + categoryId);
  }

  onLgout() {
    this.authenticationService.logout();
    this.caddyService.emptyCurrentCaddy();
    this.router.navigateByUrl('/login');
    console.log("onLogout()");
  }

  public isAdmin() {
    return this.authenticationService.isAdmin();
  }

  public isUser() {
    return this.authenticationService.isUser();
  }

  public isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

  public getAuthenticatedUserUsername() {
    return this.authenticationService.username;
  }




  public get categories(): any {
    return this._categories;
  }
  public set categories(value: any) {
    this._categories = value;
  }
  public get clickedCategoryId(): number {
    return this._clickedCategoryId;
  }
  public set clickedCategoryId(value: number) {
    this._clickedCategoryId = value;
  }
  public get showingMode(): ShowingProductsModeEnum {
    return this._showingMode;
  }
  public set showingMode(value: ShowingProductsModeEnum) {
    this._showingMode = value;
  }

}
