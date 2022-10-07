import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { Category } from '../models/Category.model';
import { Product } from '../models/Product.model';
import { GlobalService } from '../services/global.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ShowingProductsModeEnum } from '../models/ShowingProductsModeEnum';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { CaddyService } from '../services/caddy.service';

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
  private _title: string = "";
  private _currentTimeStamp: number = 0;
  public pagesArray: Array<number> = [];
  //public productsWithCategories: Array<Product> = [];
  public pageNbr: number = 0;
  public nbrEltPerPage: number = 5;
  private searchKeyword: string = "";


  constructor(private categoryService: CategoryService,
    private productService: ProductService,
    public authenticationService: AuthenticationService,
    private caddyService: CaddyService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(event => { // subscribe aux events qui se produisent ds le sys de routage
      if (event instanceof NavigationEnd) { // une fois la navigation d'une route à une autre termine, on exec le traitement ci-dessous
        let actualRoute = event.url; // recup l'url courante
        //console.log("actualRoute");
        //console.log(actualRoute);
        // recup les params, et faire le traitements requis
        let paramShowProductMode = this.activatedRoute.snapshot.params['showProductsMode'];
        let paramIdCategory = this.activatedRoute.snapshot.params['categoryId'];
        if (paramIdCategory != 0 && paramShowProductMode == ShowingProductsModeEnum.BY_CATEGORY) {
          this.title = "Produits de la catégorie " + paramIdCategory;
          this.getProductsByCategory(paramIdCategory);

        } else if (paramIdCategory == 0 && paramShowProductMode == ShowingProductsModeEnum.BY_SELECTED_PRODUCTS) {
          this.title = "Produits sélectionnées ";
          this.getSelectedProducts();

        } else if (paramShowProductMode == ShowingProductsModeEnum.BY_PRODUCTS_ON_PROMOTION) {
          this.title = "Produits en promotion ";
          this.getOnPromotionProducts();
        }
      }
    })
  }

  onNavigateToPage(pNbr: number) {
    //console.log(pNbr);
    this.pageNbr = pNbr;
    this.getProducts();
  }

  onSearchProducts(searchFormFields: any) {
    //console.log(formFields);
    // Noter bien que searchFormFields sera transmit au Model en format JSON comme suite {"fieldName1": value1, "fieldName2": value2}
    this.pageNbr = 0;
    this.searchKeyword = searchFormFields.keyword;
    this.getProducts();
  }

  private getProducts() {
    this.productService.searchProductsByKeyword(this.searchKeyword, this.pageNbr, this.nbrEltPerPage)
      .subscribe(response => {
        this._products = response;
        //this.fillProductsWithCategories(this.allProducts);
       // console.log("allProducts");
       // console.log(this._products);
        this.pagesArray = new Array<number>(this._products.page.totalPages);
      }, err => {
        console.log(err);
      })
  }

  private getOnPromotionProducts() {
    this.productService.getAllProducts(this.HOST + '/products/search/onPormotionProducts')
      .subscribe(response => {
        // garde la comme ça, non pas response._embedded.products. Voir principe ds Angular-summary.docx
        this._products = response;
      }, err => {
        console.log(err);
      })
  }

  private getSelectedProducts() {
    this.productService.getAllProducts(this.HOST + '/products/search/selectedProducts')
      .subscribe(response => {
        // garde la comme ça, non pas response._embedded.products. Voir principe ds Angular-summary.docx
        this._products = response;
      }, err => {
        console.log(err);
      })
  }
  private getProductsByCategory(clickedCategoryId: number) {
    // Recup cateogry cliqué
    let clickedCategory: Category;
    this.categoryService.getCategory(this.HOST + '/categories/' + clickedCategoryId)
      .subscribe(response1 => {
        clickedCategory = response1;
        console.log("clickedCategory");
        console.log(clickedCategory);

        // Recup list products by cateogry
        this.productService.getProductsByCategory(clickedCategory._links.self.href + '/products')
          .subscribe(response2 => {
            //console.log(response2);
            // garde la comme ça, non pas response._embedded.products. Voir principe ds Angular-summary.docx
            this._products = response2;
            //console.log("this._products");
            //console.log(this._products);
            //this.getProductPhoto(2);
          });
      }, err => {
        console.log(err);
      })

  }

  onEditPhoto(product: Product) {
    // capturer le product cliqué
    this.currentProduct = product;
    // pr masquer/afficher le button ‘Open File’
    this.isEditPhoto = true;
  }

  onSelectPhotos(event: any) {
    // récupérer ds Angular les phtotos sélectonnées par l'utilisateur ds l'explorateur
    this.selectedPhotos = event.target.files;
  }

  onUploadPhotos() {
    this.progress = 0;
    // recuprer juste la premiere photo selectionnée
    this.currentUploadedPhotos = this.selectedPhotos.item(0);
    // deleguer la tache au service
    this.productService.uploadProductPhoto(this.currentUploadedPhotos, this.currentProduct.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // definir le pourcentage de progression d'upload
          this.progress = Math.round(100 * event.loaded / event.total!);
        } else if (event instanceof HttpResponse) {
          // lors du retour de la response HTTP
          // pr resoudre le probleme de rafraichissement de la photo causé par le cache
          this.currentTimeStamp = Date.now();
          alert("Photo bien chargée");
          console.log("Photo bien chargée");
        }
      }, err => {
        console.log("Problème de chargement de la photo: " + JSON.parse(err.error).message);
        ;
      });
  }

  onProductDetail(product: Product) {
    let uriOfProduct = product._links.self.href;
    this.router.navigateByUrl('product-detail/' + btoa(uriOfProduct));
  }

  onAddProductToCaddy(addedProduct: Product) {
    this.caddyService.addProductToCaddy(addedProduct);
  }

  getCurrentTimeStamp() {
    this._currentTimeStamp = Date.now();
    return this.currentTimeStamp;
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
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }
  public get currentTimeStamp(): number {
    return this._currentTimeStamp;
  }
  public set currentTimeStamp(value: number) {
    this._currentTimeStamp = value;
  }
}
