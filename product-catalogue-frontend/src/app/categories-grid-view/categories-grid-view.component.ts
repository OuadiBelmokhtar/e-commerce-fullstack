import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/Category.model';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-categories-grid-view',
  templateUrl: './categories-grid-view.component.html',
  styleUrls: ['./categories-grid-view.component.css']
})
export class CategoriesGridViewComponent implements OnInit {

  private _allCategories: any;
  private _keyword: string = "";
  private _nbrEltPerPage: number = 5;
  private _totalPages: number = 0;
  private _indicePagesArray!: Array<number>;
  private _indicePage: number = 0;

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
  }

  public onSearchCategory(searchingFormFields: any) {
    console.log("searchingFormFields");
    console.log(searchingFormFields);
    this._keyword = searchingFormFields.keyword;
    this._indicePage = 0;
    this.categoryService.getAllCategoriesByKeyword(this._keyword, this._indicePage, this._nbrEltPerPage)
      .subscribe(response => {
        console.log("response");
        console.log(response);
        this.allCategories = response._embedded.categories;
        this._totalPages = response._page.totalPages;
        this._indicePagesArray = new Array(this._totalPages);
      }, err => {
        console.log(err);
      })
  }

  public onDeleteCategory(category: Category) {
    //   console.log(category._links.self.href);
    let confirmation = confirm("Etes-vous sûre de vouloir supprimer la catégorie " + category.name + " ?");
    if (confirmation) {
      this.categoryService.deleteCategory(category._links.self.href)
        .subscribe(response => {
          this.getCategoriesByKeyword();
        }, err => {
          console.log(err);
        });
    }
  }

  onEditCategory(category: Category) {
    let uriCategoryToEdit = category._links.self.href;
    this.router.navigateByUrl('edit-category/' + btoa(uriCategoryToEdit));
  }

  public onPageIndice(indice: number) {
    this._indicePage = indice;
    this.getCategoriesByKeyword();
  }
  private getCategoriesByKeyword() {
    this.categoryService.getAllCategoriesByKeyword(this._keyword, this._indicePage, this._nbrEltPerPage)
      .subscribe(response => {
        this._allCategories = response._embedded.categories;
      }, err => {
        console.log(err);
      });
  }

  public get allCategories() {
    return this._allCategories;
  }

  public set allCategories(categories: any) {
    this._allCategories = categories;
  }

  public get totalPages() {
    return this._totalPages;
  }
  public set totalPages(total) {
    this._totalPages = total;
  }

  public get indicePages() {
    return this._indicePagesArray;
  }
  public get indicePage() {
    return this._indicePage;
  }
}
