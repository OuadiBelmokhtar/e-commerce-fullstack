import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import { Product } from '../model/Product.model';
import { Category } from '../model/Category.model';
import { CategoryService } from '../services/category.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  public savedProduct!: Product;
  public selectedCategory!: Category;
  public isSaved: boolean = false;
  public _allCategories: any = undefined; // list des categories recuperee de la BD


  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router) {

  }

  ngOnInit(): void {
    // recuperer la list des categories pr l afficher ds <select>
    this.setAllCategories();
  }

  onAddProduct(savingFormFields: any) {
    console.log("savingFormFields ");
    console.log(savingFormFields);
    this.selectedCategory = savingFormFields.productCategory; // recuperer la category choisie ds le champ <select>
    // Noter bien que savingFormFields sera transmit au Model en format JSON comme suite {"fieldName1": value1, "fieldName2": value2}
    //definir UUID pr la reference
    let refUUID = uuidv4();
    savingFormFields.reference = refUUID;
    this.productService.saveProduct(GlobalService.HOST + "/products", savingFormFields)
      .subscribe(response => {
        //  console.log("Produit bien enregistré ");
        this.savedProduct = response;
        this.isSaved = true;
        // savedProduct contient la Category sous forme de lien non pas objet JSON
        console.log("savedProduct ");
        console.log(this.savedProduct);
        // associer le product vient d etre enregistre avec la category choisie ds le champ <select>
        this.associateProductToItsCategory();
      }, err => {
        console.log(err);
      });
  }

  private associateProductToItsCategory() {
    // 2 mtds pr recuperer les liens: soit construction manuelle ou exploitation des _links renvoyes par Spring Data Rest
    //let UriOfCategoryOfProductToEdit = GlobalService.HOST + "/products/" + this.savedProduct.id + "/category/";

    let UriOfCategoryOfProductToEdit = this.savedProduct._links.category.href; //e.g: …/products/2/category
    //let UriOfNewCategory = GlobalService.HOST + "/categories/" + this.selectedCategory.id;
    let UriOfNewCategory = this.selectedCategory._links.self.href; //e.g:  …/categories/3
    console.log("URIOfProductToBindTo");
    console.log(UriOfCategoryOfProductToEdit);
    console.log("URIOfCategoryToBind");
    console.log(UriOfNewCategory);
    this.productService.updateProductAssociation(UriOfCategoryOfProductToEdit, UriOfNewCategory)
      .subscribe(response => {
        // la reponse retournee est vide
        this.isSaved = true;
      }, err => {
        console.log(err);
      })
  }

  onNavigateToNewProduct() {
    this.isSaved = false;
  }

  public get allCategories() {
    return this._allCategories;
  }

  // public set categories(categories: Array<Category>) {
  //   this._categories = categories;
  // }
  public set allCategories(categories: any) {
    this._allCategories = categories;
  }


  setAllCategories() {
    this.categoryService.getAllCategories()
      .subscribe((response) => {
        //this._categories = new Array<Category>();
        this._allCategories = response;
        console.log(this._allCategories);
      }, err => {
        console.log(err);
      })
  }

}
