import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { Category } from '../model/Category.model';
import { Product } from '../model/Product.model';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-frontoffice-products-grid-view',
  templateUrl: './frontoffice-products-grid-view.component.html',
  styleUrls: ['./frontoffice-products-grid-view.component.css']
})
export class FrontofficeProductsGridViewComponent implements OnInit {

  private _categories: any;
  private _products: any;
  private _productPhoto: any;
  


  constructor(private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit(): void {
    // charger les categories
    this.categoryService.getAllCategories()
      .subscribe(response => {
        console.log(response);
        this._categories = response._embedded.categories;
      }, err => {
        console.log(err);
      });
  }

  public onGetProductsByCategory(clickedCategory: Category) {
    console.log("clickedCategory");
    console.log(clickedCategory);
    this.productService.getProductsByCategory(clickedCategory._links.self.href+'/products')
    .subscribe(response=>{
      console.log(response);
      this._products=response._embedded.products;
    })
  }

public onGetProductPhoto(productId:number){
  this.productService.getProductPhoto(GlobalService.HOST+"/get-product-photo/"+productId)
  .subscribe(response=>{
    this._productPhoto=response;
  }, err=>{
    console.log(err);
  })
}

  public get categories(): any {
    return this._categories;
  }
  public set categories(value: any) {
    this._categories = value;
  }
  public get products(): any {
    return this._products;
  }
  public set products(value: any) {
    this._products = value;
  }
  public get productPhoto(): any {
    return this._productPhoto;
  }
  public set productPhoto(value: any) {
    this._productPhoto = value;
  }
}
