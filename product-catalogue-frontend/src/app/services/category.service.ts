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

  public saveCategory(categoryData: any):Observable<Category> {
   return this.httpClient.post<Category>(GlobalService.HOST + "/categories", categoryData);
  }

  public deleteCategory(uri:string) {
   return this.httpClient.delete(uri);
  }

  public updateCategory(uriCategoryToEdit:string,editingFormFields: any) {
    return this.httpClient.put(uriCategoryToEdit, editingFormFields);
  }
 
  public searchCategory(keyword: string) : Observable<Category>{
    return this.httpClient.get<Category>(GlobalService.HOST + "/categories/search/filterCategoryByName?key="+keyword);
  }

  public getAllCategories(): Observable<Category> {
    return this.httpClient.get<Category>(GlobalService.HOST + "/categories");
  }

  public getAllCategoriesByKeyword(keyword: string, page:number, size:number): Observable<Category> {
    return this.httpClient.get<Category>(GlobalService.HOST + "/categories/search/filterCategoryByNamePage?key="+keyword+"&page="+page+"&size="+size);
  }

  public getCategory(URI: string): Observable<Category> {
    return this.httpClient.get<Category>(URI);
  }




}
