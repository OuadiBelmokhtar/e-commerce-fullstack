import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/Product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private _currentProduct!: Product;
  
  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    let uriOfProductToShowDetail=atob(this.activatedRoute.snapshot.params['uriOfProductToShowDetail']);
    console.log("uriOfProductToShowDetail");
    console.log(uriOfProductToShowDetail);
  }

  public get currentProduct(): Product {
    return this._currentProduct;
  }
  public set currentProduct(value: Product) {
    this._currentProduct = value;
  }

}
