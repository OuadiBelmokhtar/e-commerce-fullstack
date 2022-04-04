import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import { Product } from '../model/Product.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  public savedProduct!: Product;
  public isSaved: boolean = false;

  constructor(private productService: ProductService, private router: Router) {

  }

  ngOnInit(): void {
    
  }

  onAddProduct(savingFormFields: any) {
    //console.log(saveFormFields);
    // Noter bien que saveFormFields sera transmit au Model en format JSON comme suite {"fieldName1": value1, "fieldName2": value2}
    this.productService.saveProduct(GlobalService.HOST + "/products", savingFormFields)
      .subscribe(response => {
      //  console.log("Produit bien enregistré ");
        // this.router.navigateByUrl("/products-grid");
       // console.log(response);
        this.savedProduct = response;
        this.isSaved = true;
      }, err => {
        console.log(err);
      })
  }

  onNavigateToNewProduct() {
    this.isSaved = false;
  }

}
