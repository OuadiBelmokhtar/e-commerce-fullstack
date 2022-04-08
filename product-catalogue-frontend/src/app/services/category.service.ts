import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/Category.model';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) {

  }

  public getAllCategories(): Observable<Category> {
    return this.httpClient.get<Category>(GlobalService.HOST + "/categories");
  }

public getCategory(URI: string):Observable<Category>{
return this.httpClient.get<Category>(URI);
}

}
