import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { Product } from '../models/Product.model';
import { Category } from '../models/Category.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {

  }

  public getProductsByCategory(uri: string): Observable<Product> {
    return this.httpClient.get<Product>(uri, { headers: new HttpHeaders({ 'Authorization': "Bearer " + this.authService.getJwtAccessToken() }) });
  }

  getAllProducts(uri: string): Observable<Product> {
    let authorizationHeader = new HttpHeaders({ 'Authorization': "Bearer " + this.authService.getJwtAccessToken() });
    return this.httpClient.get<Product>(uri, { headers: authorizationHeader });
    /* la partie de traitement de lexpiration du access-token et la manip du refresh-token n'est pas fonctionnelle efficacement. Ca donne un résultat correcte,
    // mais pas encore maturée. Cote backend c'est validé, il reste qlq optimisations cote frontend.
    if (this.authService.isJwtExpired()) {
      console.log("getAllProducts(): jwtAccessToken is expired ! ");
      // traiter le cas de manipulation du refresh-token
      this.authService.sendRefreshTokenAndGetNewAccessToken()
        .subscribe(response => {
          // manipuler la variable jwtAuthToken de authService afin de centraliser le stockage du JWT
          this.authService.jwtAuthToken = response;
          console.log("getAllProducts().sendRefreshTokenAndGetNewAccessToken().jwtAuthToken: ");
          console.log(this.authService.jwtAuthToken);
          this.authService.saveJwtAuthTokenToLocalStorage();
          this.authService.parseJwtAuthTokenAndInitUsernameRoles();
        }, err => {
          console.log(err);
        });

     // throw new Error("JWT Access Token est expiré!");
    }
    */
  }

  getProducts(pageNbr: number, size: number): Observable<Product> {
    return this.httpClient.get<Product>(GlobalService.HOST + "/products?page=" + pageNbr + "&size=" + size, { headers: new HttpHeaders({ 'Authorization': "Bearer " + this.authService.getJwtAccessToken() }) });
  }

  searchProductsByKeyword(keyword: string, pageNbr: number, size: number): Observable<Product> {
    return this.httpClient.get<Product>(GlobalService.HOST + "/products/search/filterByDesignationPage?key=" + keyword + "&page=" + pageNbr + "&size=" + size, { headers: new HttpHeaders({ 'Authorization': "Bearer " + this.authService.getJwtAccessToken() }) });
  }

  deleteProduct(URL: string) {
    // Noter bien que la mtd DELETE ne retourne rien
    return this.httpClient.delete(URL, { headers: new HttpHeaders({ 'Authorization': "Bearer " + this.authService.getJwtAccessToken() }) });
  }

  updateProductAssociation(UriOfCategoryOfProductToEdit: string, UriOfNewCategory: string) {
    // this.httpClient.put(uriOfRsrcToUpdate, bodyOfRequest(or updatedData), headers)
    // e.g: put(…/products/2/category, …/categories/3)
    return this.httpClient.put(UriOfCategoryOfProductToEdit, UriOfNewCategory, { headers: new HttpHeaders({ 'Content-Type': 'text/uri-list', 'Authorization': "Bearer " + this.authService.getJwtAccessToken() }) });

  }

  updateProduct(URL: string, dataOfEditedProduct: any) {
    return this.httpClient.put(URL, dataOfEditedProduct, { headers: new HttpHeaders({ 'Authorization': "Bearer " + this.authService.getJwtAccessToken() }) });

  }

  patchProduct(URL: string, dataOfEditedProduct: any) {
    return this.httpClient.patch<Product>(URL, dataOfEditedProduct, { headers: new HttpHeaders({ 'Authorization': "Bearer " + this.authService.getJwtAccessToken() }) });

  }

  saveProduct(URL: string, data: Product): Observable<Product> {
    // Noter bien que la mtd POST RETROUNE l objet enregistre format JSON, avec ses propres _links
    return this.httpClient.post<Product>(URL, data, { headers: new HttpHeaders({ 'Authorization': "Bearer " + this.authService.getJwtAccessToken() }) });
  }

  getProduct(URL: string): Observable<Product> {
    return this.httpClient.get<Product>(URL, { headers: new HttpHeaders({ 'Authorization': "Bearer " + this.authService.getJwtAccessToken() }) });
  }

  getProductPhoto(URL: string) {
    return this.httpClient.get(URL, { headers: new HttpHeaders({ 'Authorization': "Bearer " + this.authService.getJwtAccessToken() }) });
    //pas besoin ,{ headers: new HttpHeaders({ 'Content-Type': 'image/png' }) }
  }

  getCategoryOfProduct(URICategory: string): Observable<Category> {
    return this.httpClient.get<Category>(URICategory, { headers: new HttpHeaders({ 'Authorization': "Bearer " + this.authService.getJwtAccessToken() }) });
  }

  /* 
  Envoyer la photo au backend
  photo: la photo a uploader
  idProductToUpdate: l'id du product dont on veut maj la photo
  */
  //
  uploadProductPhoto(photo: File, idProductToUpdate: number): Observable<HttpEvent<{}>> {
    // on peut utiliser ce meme programme pr uploader differents types de fichiers (excel, ...)
    // Encapsuler la photo selectionnee par l'utilisateur ds un objet FormaData. 
    // C'est cet objet qui sera serialisé au backend ds une requete POST
    let formData: FormData = new FormData();
    formData.append('photoFile', photo);
    // construire une requete POST
    // Comme constaté, uploader un fichier vers le backend, 
    // consiste à envoyer une requete POST contenant le fichier à envoyer ds son body.
    const req = new HttpRequest('POST', GlobalService.HOST + '/upload-product-photo/' + idProductToUpdate,
      formData,{ 
      headers: new HttpHeaders({ 'Authorization': "Bearer " + this.authService.getJwtAccessToken() }), 
      // pr recevoir la progression d'ulpoad
      reportProgress: true,
      // on veut recevoir une reponse Text, non pas JSON.
      responseType: 'text'
    });
    return this.httpClient.request(req);
  }

}
