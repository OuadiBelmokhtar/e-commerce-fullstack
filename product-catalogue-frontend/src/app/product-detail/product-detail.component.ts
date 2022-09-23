import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/Product.model';
import { ProductService } from '../services/product.service';
import { GlobalService } from '../services/global.service';
import { AuthenticationService } from '../services/authentication.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private _currentProduct!: Product;
  private _showMode: number = 0;
  private _HOST: string = "";
  private _isEditPhoto: boolean = false;
 // private _selectedPhotos: any;

  //private _progress: number = 0;
  //private _currentUploadedPhotos: any;
  private _currentTimeStamp: number = 0;


  constructor(private productService: ProductService,
    public authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.showMode = 0;
    let uriOfProductToShowDetail = atob(this.activatedRoute.snapshot.params['uriOfProductToShowDetail']);
    // console.log("uriOfProductToShowDetail");
    // console.log(uriOfProductToShowDetail);
    this.productService.getProduct(uriOfProductToShowDetail).subscribe(
      response => {
        this.currentProduct = response;
        // console.log("this.currentProduct");
        // console.log(this.currentProduct);
      }, err => {
        console.log(err);
      }
    )
  }

  onAddProductToCaddy() {

  }

  onUpdateProduct(formUpdateProductFields: any) {
    let uriOfProductToUpdate = this.currentProduct._links.self.href;
    this.productService.patchProduct(uriOfProductToUpdate, formUpdateProductFields)
      .subscribe(response => {
        this.currentProduct = response;
        this.showMode = 0;
      }, err => {
        console.log(err);
      })
  }

  onEditProduct() {
    this.showMode = 1;
  }
  onEditPhoto(product: Product) {
    // capturer le product cliqué
    this.currentProduct = product;
    // pr masquer/afficher le button ‘Open File’
    this.isEditPhoto = true;
  }
  // utilisation de l'upload au serveur backend
  /*
    onSelectPhotos(event: any) {
      // récupérer ds Angular les phtotos sélectonnées par l'utilisateur ds l'explorateur
      this.selectedPhotos = event.target.files;
      // console.log("this.selectedPhotos");
      // console.log(this.selectedPhotos);
    }
  
    onUploadPhotos() {
      this.progress = 0;
      // recuprer juste la premiere photo selectionnée
      this.currentUploadedPhotos = this.selectedPhotos.item(0);
      // deleguer la tache au service
      this.productService.uploadProductPhoto(this.currentUploadedPhotos, this.currentProduct.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            // definir le pourcentage de progression d'upload
            this.progress = Math.round(100 * event.loaded / event.total!);
          } else if (event instanceof HttpResponse) {
            // lors du retour de la response HTTP
            // pr resoudre le probleme de rafraichissement de la photo causé par le cache
            this._currentTimeStamp = Date.now();
            alert("Photo bien chargée");
            console.log("Photo bien chargée");
          }
        }, err => {
          console.log("Problème de chargement de la photo: " + JSON.parse(err.error).message);
          ;
        });
    }
  */
    getCurrentTimeStamp() {
       this._currentTimeStamp=Date.now();
      return this._currentTimeStamp;
    }

  public get HOST(): string {
    this._HOST = GlobalService.HOST;
    return this._HOST;
  }

  public get currentProduct(): Product {
    return this._currentProduct;
  }
  public set currentProduct(value: Product) {
    this._currentProduct = value;
  }
  public get showMode(): number {
    return this._showMode;
  }
  public set showMode(value: number) {
    this._showMode = value;
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
  */
  public get isEditPhoto(): boolean {
    return this._isEditPhoto;
  }
  public set isEditPhoto(value: boolean) {
    this._isEditPhoto = value;
  }
}
