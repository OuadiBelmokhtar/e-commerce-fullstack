import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product.model';
import { Router } from '@angular/router';
import { Category } from '../models/Category.model';
import { AuthenticationService } from '../services/authentication.service';
import { FileUpload } from '../models/FileUpload.model';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-products-grid-view',
  templateUrl: './products-grid-view.component.html',
  styleUrls: ['./products-grid-view.component.css']
})
export class ProductsGridViewComponent implements OnInit {

  public allProducts: any = undefined;
  public pagesArray: Array<number> = [];
  //public productsWithCategories: Array<Product> = [];
  public pageNbr: number = 0;
  public nbrEltPerPage: number = 5;
  private searchKeyword: string = "";

  constructor(private productService: ProductService,
    private authService: AuthenticationService, private router: Router,
    private fileUploadService: FileUploadService) {

  }

  ngOnInit(): void {
  }

  onSearchProducts(searchFormFields: any) {
    //console.log(formFields);
    // Noter bien que searchFormFields sera transmit au Model en format JSON comme suite {"fieldName1": value1, "fieldName2": value2}
    this.pageNbr = 0;
    this.searchKeyword = searchFormFields.keyword;
    this.getProducts();
  }

  onNavigateToPage(pNbr: number) {
    //console.log(pNbr);
    this.pageNbr = pNbr;
    this.getProducts();
  }

  private getProducts() {
    this.productService.searchProductsByKeyword(this.searchKeyword, this.pageNbr, this.nbrEltPerPage)
      .subscribe(response => {
        this.allProducts = response;
        //this.fillProductsWithCategories(this.allProducts);
        //console.log("allProducts");
        // console.log(this.allProducts);
        this.pagesArray = new Array<number>(this.allProducts.page.totalPages);
      }, err => {
        console.log(err);
      })
  }
  // ca ne marche pas
  // private fillProductsWithCategories(products:Array<Product>):void{
  //   for (let product of products) {
  //     product.productCategory=this.getCategoryOfProduct(product._links.category.href);
  //     this.productsWithCategories.push(product);
  //   }
  // }

  onDeleteProduct(product: Product) {
    //console.log(product);
    // pr construire lURI on peut soit exploiter le lien autogenere par Spring Data Rest, ou le construire manuellement
    // via URI="http://localhost:8087/products/"+product.id
    let URI = product._links.self.href;
    //console.log(URI);
    let confirmDeletion = confirm("Etes-vous sure de supprimer le produit: " + product.id + " ?");
    if (confirmDeletion) {
      this.productService.deleteProduct(URI)
        .subscribe(response => {
          // supprimer la photo du Firebase Storage
          this.fileUploadService.deletePhotoFromFireStorage(product.photoName);
          this.getProducts();
        }, err => {
          console.log(err);
        })
    }
  }

  onEditProduct(product: any) {
    this.router.navigateByUrl('edit-product/' + btoa(product._links.self.href));
  }

  getCategoryOfProduct(URICategory: string): any {
    this.productService.getCategoryOfProduct(URICategory)
      .subscribe(response => {
        return response;
      }, err => {
        console.log(err);
      })
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

}
