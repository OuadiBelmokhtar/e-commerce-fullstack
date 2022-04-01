import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private host:string="http://localhost:8087";

  constructor(private httpClient: HttpClient) { 
    
  }


  getProducts(pageNbr: number, size: number) {
    return this.httpClient.get(this.host+"/products?page=" + pageNbr + "&size=" + size);
  }

  searchProducts(keyword:string,pageNbr: number, size: number ){
    return this.httpClient.get(this.host+"/products/search/filterByDesignationPage?key="+keyword+"&page="+pageNbr+"&size="+size);
  }

  supprimerProduct(URI:string){
    return this.httpClient.delete(URI);
  }
}
