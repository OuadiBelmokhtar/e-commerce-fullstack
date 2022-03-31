import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }


  getProducts(pageNbr: number, size: number) {
    return this.httpClient.get("http://localhost:8087/products?page=" + pageNbr + "&size=" + size);
  }
}
