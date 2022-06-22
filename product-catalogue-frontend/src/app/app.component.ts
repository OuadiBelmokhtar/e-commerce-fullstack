import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { Category } from './model/Category.model';
import { Router } from '@angular/router';
import { ShowingProductsModeEnum } from './model/ShowingProductsModeEnum';
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
  private _showingMode: ShowingProductsModeEnum=ShowingProductsModeEnum.FRONT_OFFICE;
  
  
  constructor(private categoryService: CategoryService,
    private productService: ProductService,
    private authenticationService:AuthenticationService,
    public caddyService:CaddyService,
    private router: Router) {

  }

  ngOnInit(): void {
    // charger authenticatedUser du localStorage
   this.getAuthenticatedUser();
   console.log("this.getAuthenticatedUser()");
   console.log(this.getAuthenticatedUser());
    // charger les categories
    this.categoryService.getAllCategories()
      .subscribe(response => {
        console.log(response);
        this._categories = response._embedded.categories;
      }, err => {
        console.log(err);
      });
  }

public getAuthenticatedUser(): any {
    return this.authenticationService.loadAndGetJwtAuthTokenFromLocalStorage();
  }

  onNavigateToShowSelectedProducts() {
    this.showingMode=ShowingProductsModeEnum.FRONT_OFFICE;
    this._clickedCategoryId=0;
    this.router.navigateByUrl("frontoffice-products-grid/" + ShowingProductsModeEnum.BY_SELECTED_PRODUCTS + "/" + 0);
  }

  onNavigateToShowOnPromotionProducts() {
    this.showingMode=ShowingProductsModeEnum.FRONT_OFFICE;
    this._clickedCategoryId=0;
    this.router.navigateByUrl("frontoffice-products-grid/" + ShowingProductsModeEnum.BY_PRODUCTS_ON_PROMOTION + "/" + 0);
  }

  onNavigateToShowProductsByCategory(categoryId: number) {
    this.showingMode=ShowingProductsModeEnum.FRONT_OFFICE;
    this.clickedCategoryId = categoryId;
    this.router.navigateByUrl("frontoffice-products-grid/" + ShowingProductsModeEnum.BY_CATEGORY + "/" + categoryId);
  }

  onLgout(){
    this.authenticationService.removeJwtAuthTokenFromLocalStorage();
    this.router.navigateByUrl('/login');
    console.log("onLogout()");
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
