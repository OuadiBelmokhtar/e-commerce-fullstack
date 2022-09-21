import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/Category.model';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
 
  constructor(private httpClient: HttpClient, private authService:AuthenticationService) {

  }

  public saveCategory(categoryData: any):Observable<Category> {
   return this.httpClient.post<Category>(GlobalService.HOST + "/categories", categoryData,{headers:new HttpHeaders({'Authorization':"Bearer "+this.authService.getJwtAccessToken()})});
  }

  public deleteCategory(uri:string) {
   return this.httpClient.delete(uri,{headers:new HttpHeaders({'Authorization':"Bearer "+this.authService.getJwtAccessToken()})});
  }

  public updateCategory(uriCategoryToEdit:string,editingFormFields: any) {
    return this.httpClient.put(uriCategoryToEdit, editingFormFields,{headers:new HttpHeaders({'Authorization':"Bearer "+this.authService.getJwtAccessToken()})});
  }

  public patchCategory(uriCategoryToEdit:string,editingFormFields: any) {
    return this.httpClient.patch(uriCategoryToEdit, editingFormFields,{headers:new HttpHeaders({'Authorization':"Bearer "+this.authService.getJwtAccessToken()})});
  }
 
  public searchCategory(keyword: string) : Observable<Category>{
    return this.httpClient.get<Category>(GlobalService.HOST + "/categories/search/filterCategoryByName?key="+keyword,{headers:new HttpHeaders({'Authorization':"Bearer "+this.authService.getJwtAccessToken()})});
  }

  public getAllCategories(): Observable<Category> {
    return this.httpClient.get<Category>(GlobalService.HOST + "/categories",{headers:new HttpHeaders({'Authorization':"Bearer "+this.authService.getJwtAccessToken()})});
  }

  public getAllCategoriesByKeyword(keyword: string, page:number, size:number): Observable<Category> {
    return this.httpClient.get<Category>(GlobalService.HOST + "/categories/search/filterCategoryByNamePage?key="+keyword+"&page="+page+"&size="+size,{headers:new HttpHeaders({'Authorization':"Bearer "+this.authService.getJwtAccessToken()})});
  }

  public getCategory(URI: string): Observable<Category> {
    return this.httpClient.get<Category>(URI,{headers:new HttpHeaders({'Authorization':"Bearer "+this.authService.getJwtAccessToken()})});
  }




}
