import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/Product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  private uriProductToUpdate: string = "";
  private _productToUpdate!: Product;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router:Router) { }


  ngOnInit(): void {
    this.uriProductToUpdate = atob(this.activatedRoute.snapshot.params['uriProductToEdit']);
    this.productService.getProduct(this.uriProductToUpdate).subscribe(
      data => {
        this.productToUpdate = data;
      }, err => {
        console.log(err);
      });
  }

  onUpdateProduct(updatingFormFields: any) {
    this.productService.updateProduct(this.uriProductToUpdate, updatingFormFields)
      .subscribe(data => {
        alert("Produit " + updatingFormFields.designation + " bien modifié");
        this.router.navigateByUrl("products-grid");
      }, err => {
        console.log(err);
      });
  }

  public get productToUpdate() {
    return this._productToUpdate;
  }

  public set productToUpdate(p: Product) {
    this._productToUpdate = p;
  }

}
