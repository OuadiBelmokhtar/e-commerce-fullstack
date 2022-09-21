import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/Product.model';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/Category.model';
import { GlobalService } from '../services/global.service';

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
      response => {
        this._productToUpdate = response;
        // recuperer la list des categories pr l afficher ds <select>
        this.setAllCategories();
        // 
        this.setCategoryAssociatedWithProductToUpdat(this._productToUpdate);
      }, err => {
        console.log(err);
      });
  }

  onUpdateProduct(updatingFormFields: any) {
    // modifer les infos du product
    this.productService.patchProduct(this.uriProductToUpdate, updatingFormFields)
      .subscribe(response => {
        
        // modifier la category associee
        this.updateAssociationProductCategory(updatingFormFields);
        alert("Produit " + updatingFormFields.designation + " bien modifié");
        console.log("updatingFormFields");
        console.log(updatingFormFields);
        this.router.navigateByUrl("/products-grid");
      }, err => {
        console.log(err);
      });
  }

  // recuperer la category associee au Product choisi ds la grille
  private setCategoryAssociatedWithProductToUpdat(productToUpdate: Product) {
    let URICategoryAssociatedWithProductToUpdat = productToUpdate._links.category.href;
    this.categoryService.getCategory(URICategoryAssociatedWithProductToUpdat)
      .subscribe(response => {
        this._productToUpdate.productCategory = response;
        console.log("Category of productToUpdate");
        console.log(this._productToUpdate.productCategory);
      }, err => {
        console.log(err);
      });
  }

  private updateAssociationProductCategory(updatingFormFields: any) {
    // pr le cas de modification, vu la contrainte de manipulation de l'id de la category ds <select>, on ne peut utiliser qu'une SEULE mtd pr recuperer les liens: c'est la construction manuelle
    let URIOfProductToBindTo = this.uriProductToUpdate + "/category";
    let URIOfCategoryToBind = GlobalService.HOST + "/categories/" + updatingFormFields.productCategoryId;
    console.log("URIOfProductToBindTo");
    console.log(URIOfProductToBindTo);
    console.log("URIOfCategoryToBind");
    console.log(URIOfCategoryToBind);
    this.productService.updateProductAssociation(URIOfProductToBindTo, URIOfCategoryToBind)
      .subscribe(response => {
        // la reponse retournee par PUT est vide
        console.log("Category updated");
      }, err => {
        console.log(err);
      })
  }

  setAllCategories() {
    this.categoryService.getAllCategories()
      .subscribe((response) => {
        //this._categories = new Array<Category>();
        this._allCategories = response;
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
