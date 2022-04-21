import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { Category } from '../model/Category.model';
import { Product } from '../model/Product.model';
import { GlobalService } from '../services/global.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ShowingProductsModeEnum } from '../model/ShowingProductsModeEnum';

@Component({
  selector: 'app-frontoffice-products-grid-view',
  templateUrl: './frontoffice-products-grid-view.component.html',
  styleUrls: ['./frontoffice-products-grid-view.component.css']
})
export class FrontofficeProductsGridViewComponent implements OnInit {

  private _HOST: string = "";
  private _products: any;
  private _currentProduct!: Product;
  private _isEditPhoto: boolean = false;
  private _selectedPhotos: any;
  private _progress: number = 0;
  private _currentUploadedPhotos: any;




  constructor(private categoryService: CategoryService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(event => { // subscribe aux events qui se produisent ds le sys de routage
      if (event instanceof NavigationEnd) { // une fois la navigation d'une route à une autre termine
        let actualRoute = event.url; // recup l'url courante
        console.log("actualRoute");
        console.log(actualRoute);
        // recup les params, et faire le traitements requis
        let paramShowProductMode = this.activatedRoute.snapshot.params['showProductsMode'];
        let paramIdCategory = this.activatedRoute.snapshot.params['categoryId'];
        if (paramIdCategory != 0 && paramShowProductMode == ShowingProductsModeEnum.BY_CATEGORY) {
          this.getProductsByCategory(paramIdCategory);

        } else if (paramIdCategory == 0 && paramShowProductMode == ShowingProductsModeEnum.BY_SELECTED_PRODUCTS) {
          this.getSelectedProducts();

        } else if (paramShowProductMode == ShowingProductsModeEnum.BY_PRODUCTS_ON_PROMOTION) {
          this.getOnPromotionProducts();
        }
      }
    })


  }

  private getOnPromotionProducts() {
    this.productService.getAllProducts(this.HOST + '/products/search/onPormotionProducts')
      .subscribe(response => {
        this._products = response._embedded.products;
      }, err => {
        console.log(err);
      })
  }

  private getSelectedProducts() {
    this.productService.getAllProducts(this.HOST + '/products/search/selectedProducts')
      .subscribe(response => {
        this._products = response._embedded.products;
      }, err => {
        console.log(err);
      })
  }
  private getProductsByCategory(clickedCategoryId: number) {
    // Recup cateogry cliqué
    let clickedCategory: Category;
    this.categoryService.getCategory(this.HOST + '/categories/' + clickedCategoryId)
      .subscribe(response => {
        clickedCategory = response;
        console.log("clickedCategory");
        console.log(clickedCategory);

        // Recup list product by cateogry
        this.productService.getProductsByCategory(clickedCategory._links.self.href + '/products')
          .subscribe(response => {
            console.log(response);
            this._products = response._embedded.products;
            console.log("this._products");
            console.log(this._products);
            //this.getProductPhoto(2);
          });
      }, err => {
        console.log(err);
      })

  }

  onEditPhoto(product: Product) {
    // capturer le product cliqué
    this.currentProduct = product;
    this.isEditPhoto = true;
  }

  onSelectPhotos(event: any) {
    // récupérer les phtotos sélectonnées par l'utilisateur ds l'explorateur
    this.selectedPhotos = event.target.files;
  }

  onUploadPhotos() {
    this.progress = 0;
    // recuprer juste la premiere photo selectionnée
    this.currentUploadedPhotos = this.selectedPhotos.items(0);
...
  }

  public get products(): any {
    return this._products;
  }
  public set products(value: any) {
    this._products = value;
  }
  public get HOST(): string {
    this._HOST = GlobalService.HOST;
    return this._HOST;
  }
  public set HOST(value: string) {
    this._HOST = value;
  }
  public get currentProduct(): Product {
    return this._currentProduct;
  }
  public set currentProduct(value: Product) {
    this._currentProduct = value;
  }
  public get isEditPhoto(): boolean {
    return this._isEditPhoto;
  }
  public set isEditPhoto(value: boolean) {
    this._isEditPhoto = value;
  }
  public get selectedPhotos(): any {
    return this._selectedPhotos;
  }
  public set selectedPhotos(value: any) {
    this._selectedPhotos = value;
  }

  public get progress(): number {
    return this._progress;
  }
  public set progress(value: number) {
    this._progress = value;
  }
  public get currentUploadedPhotos(): any {
    return this._currentUploadedPhotos;
  }
  public set currentUploadedPhotos(value: any) {
    this._currentUploadedPhotos = value;
  }
}
