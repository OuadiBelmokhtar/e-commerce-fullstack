import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import { Product } from '../model/Product.model';
import { Category } from '../model/Category.model';
import { CategoryService } from '../services/category.service';

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
    console.log("FormFields ");
    console.log(savingFormFields);
    this.selectedCategory = savingFormFields.productCategory; // recuperer la category choisie ds le champ <select>
    // Noter bien que savingFormFields sera transmit au Model en format JSON comme suite {"fieldName1": value1, "fieldName2": value2}
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
    //let URIOfProductToBindTo = GlobalService.HOST + "/products/" + this.savedProduct.id + "/category/";
    let URIOfProductToBindTo = this.savedProduct._links.category.href;
    //let URIOfCategoryToBind = GlobalService.HOST + "/categories/" + this.selectedCategory.id;
    let URIOfCategoryToBind = this.selectedCategory._links.self.href;
    console.log("URIOfProductToBindTo");
    console.log(URIOfProductToBindTo);
    console.log("URIOfCategoryToBind");
    console.log(URIOfCategoryToBind);
    this.productService.updateProductAssociation(URIOfProductToBindTo, URIOfCategoryToBind)
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
