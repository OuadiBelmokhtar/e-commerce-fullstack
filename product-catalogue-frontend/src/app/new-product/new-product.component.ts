import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import { Product } from '../models/Product.model';
import { Category } from '../models/Category.model';
import { CategoryService } from '../services/category.service';
import { v4 as uuidv4 } from 'uuid';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { FileUploadService } from '../services/file-upload.service';

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

  // utilisation de l'upload au serveur backend
  /*
  private _selectedPhotos: any;
  private _progress: number = 0;
  private _currentUploadedPhotos: any;
  private _currentTimeStamp: number = 0;
  */


  constructor(private productService: ProductService, private categoryService: CategoryService, 
    public fileUploadService:FileUploadService,private router: Router) {

  }

  ngOnInit(): void {
    // recuperer la list des categories pr l afficher ds <select>
    this.setAllCategories();
  }

  onAddProduct(savingFormFields: any) {
    console.log("savingFormFields ");
    console.log(savingFormFields);
   // alert(savingFormFields.photoName);
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

        /* // utilisation de l'upload au serveur backend
        if (savingFormFields.photoName) {
          // uploader la photo et MAJ le nom de la photo ds la BD
          this.onUploadPhotos(this.savedProduct.id);
          //console.log(savingFormFields.photoName);
        }
        */

        // associer le product vient d etre enregistre avec la category choisie ds le champ <select>
        this.associateProductToItsCategory();
      }, err => {
        console.log(err);
      });
  }
  // utilisation de l'upload au serveur backend
  /*
  private patchProductPhotoName(URI: string, pPhotoName: string) {
    this.productService.patchProduct(URI, { photoName: pPhotoName })
      .subscribe(response => {
        // la reponse retournee par PATCH est vide
        console.log("Photo name updated");
        console.log(response);
      }, err => {
        console.log(err);
      });
  }
  */
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
  // utilisation de l'upload au serveur backend
  /*
    onSelectPhotos(event: any) {
      // récupérer ds Angular les phtotos sélectonnées par l'utilisateur ds l'explorateur
      this.selectedPhotos = event.target.files;
    }
    */

  // utilisation de l'upload au serveur backend
  /*
  onUploadPhotos(productId:number) {
    this.progress = 0;
    // recuprer juste la premiere photo selectionnée
    this.currentUploadedPhotos = this.selectedPhotos.item(0);
    // deleguer la tache au service
    this.productService.uploadProductPhoto(this.currentUploadedPhotos, productId)
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
          // Maj le nom de la photo ds la BD via this.savedProduct.id
          this.patchProductPhotoName(GlobalService.HOST + "/products/" + this.savedProduct.id,String(this.savedProduct.id)+".jpg" );
        }
      }, err => {
        console.log("Problème de chargement de la photo: " + JSON.parse(err.error).message);
        ;
      });
  }
*/
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

  /*
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
  public get currentTimeStamp(): number {
    return this._currentTimeStamp;
  }
  public set currentTimeStamp(value: number) {
    this._currentTimeStamp = value;
  }
  */
}
