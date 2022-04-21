import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { Product } from '../model/Product.model';
import { Category } from '../model/Category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {

  }

  public getProductsByCategory(uri: string): Observable<Product> {
    return this.httpClient.get<Product>(uri);
  }

  getAllProducts(uri: string): Observable<Product> {
    return this.httpClient.get<Product>(uri);
  }

  getProducts(pageNbr: number, size: number): Observable<Product> {
    return this.httpClient.get<Product>(GlobalService.HOST + "/products?page=" + pageNbr + "&size=" + size);
  }

  searchProductsByKeyword(keyword: string, pageNbr: number, size: number): Observable<Product> {
    return this.httpClient.get<Product>(GlobalService.HOST + "/products/search/filterByDesignationPage?key=" + keyword + "&page=" + pageNbr + "&size=" + size);
  }

  deleteProduct(URL: string) {
    // Noter bien que la mtd DELETE ne retourne rien
    return this.httpClient.delete(URL);
  }

  updateProductAssociation(URIOfProductToBindTo: string, URIOfCategoryToBind: string) {
    return this.httpClient.put(URIOfProductToBindTo, URIOfCategoryToBind, { headers: new HttpHeaders({ 'Content-Type': 'text/uri-list' }) });

  }

  updateProduct(URL: string, dataOfEditedProduct: any) {
    return this.httpClient.put(URL, dataOfEditedProduct);

  }

  saveProduct(URL: string, data: Product): Observable<Product> {
    // Noter bien que la mtd POST RETROUNE l objet enregistre format JSON, avec ses propres _links
    return this.httpClient.post<Product>(URL, data);
  }

  getProduct(URL: string): Observable<Product> {
    return this.httpClient.get<Product>(URL);
  }

  getProductPhoto(URL: string) {
    return this.httpClient.get(URL);
    //pas besoin ,{ headers: new HttpHeaders({ 'Content-Type': 'image/png' }) }
  }

  getCategoryOfProduct(URICategory: string): Observable<Category> {
    return this.httpClient.get<Category>(URICategory);
  }

  /* 
  Envoyer la photo au backend
  photoFile: la photo a uploader
  idProductToUpdate: l'id du product on veut maj la photo
  */
  //
  uploadProductPhoto(photo: File, idProductToUpdate: number): Observable<HttpEvent<{}>> {
    // on peut utiliser ce meme programme pr uploader differents types de fichiers (excel, ...)
    // Encapsuler la photo selectionne par l'utilisateur ds un objet FormaData. 
    // C'est cet objet qui sera serialisé au backend ds une requete POST
    let formData: FormData = new FormData();
    formData.append('photoFile', photo);
    // construire une requete POST
    const req = new HttpRequest('POST', GlobalService.HOST + '/upload-product-photo/'+idProductToUpdate, 
    formData, {
      // pr recevoir la progression d'ulpoad
      reportProgress: true,
      // on veut recevoir une reponse Text, non pas JSON.
      responseType: 'text'
    });
    return this.httpClient.request(req);
  }

}
