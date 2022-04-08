import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/Product.model';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/Category.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  private uriProductToUpdate: string = "";
  private _productToUpdate!: Product;
  private _allCategories: any;

  constructor(private productService: ProductService, private categoryService: CategoryService, private activatedRoute: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    // recuperer et decrypter l uri passe en param par le component ProductsGridView
    this.uriProductToUpdate = atob(this.activatedRoute.snapshot.params['uriProductToEdit']);
    this.productService.getProduct(this.uriProductToUpdate).subscribe(
      data => {
        this._productToUpdate = data;
        // recuperer la list des categories pr l afficher ds <select>
        this.setAllCategories();
        // 
        this.setCategoryAssociatedWithProductToUpdat(this._productToUpdate);
      }, err => {
        console.log(err);
      });
  }

  onUpdateProduct(updatingFormFields: any) {
    this.productService.updateProduct(this.uriProductToUpdate, updatingFormFields)
      .subscribe(data => {
        alert("Produit " + updatingFormFields.designation + " bien modifié");
        console.log("updatingFormFields");
        console.log(updatingFormFields);
        this.router.navigateByUrl("products-grid");
      }, err => {
        console.log(err);
      });
  }

  // recuperer la category associee au Product choisi ds la grille
  private setCategoryAssociatedWithProductToUpdat(productToUpdate: Product) {
    let URICategoryAssociatedWithProductToUpdat = productToUpdate._links.category.href;
    this.categoryService.getCategory(URICategoryAssociatedWithProductToUpdat)
      .subscribe(data => {
        this._productToUpdate.productCategory = data;
        console.log("Category of productToUpdate");
        console.log(this._productToUpdate.productCategory);
      }, err => {
        console.log(err);
      });
  }

  setAllCategories() {
    this.categoryService.getAllCategories()
      .subscribe((data) => {
        //this._categories = new Array<Category>();
        this._allCategories = data;
        console.log("_allCategories");
        console.log(this._allCategories);
      }, err => {
        console.log(err);
      })
  }

  public get productToUpdate() {
    return this._productToUpdate;
  }

  public set productToUpdate(p: Product) {
    this._productToUpdate = p;
  }

  public get allCategories() {
    return this._allCategories;
  }
  public set allCategories(allCategories) {
    this._allCategories = allCategories;
  }

}
