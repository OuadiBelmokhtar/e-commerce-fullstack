import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/Category.model';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  private _savedCategory!: Category;
  private _isSaved: boolean = false;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }
  // TODO: chercher le rôle de ngModel, sans elle les valeurs du form ne passent pas au component.ts
  onSaveCategory(savingFormFields: any): void {
    //console.log(savingFormFields);
    this.categoryService.saveCategory(savingFormFields)
      .subscribe(response => {
        this._savedCategory = response;
        this._isSaved = true;
        //console.log("Category saved");
      }, err => {
        console.log(err);
      })
  }

  onNewCategory() {
    this._isSaved = false;
  }

  public get savedCategory() {
    return this._savedCategory;
  }
  public set savedCategory(category: Category) {
    this._savedCategory = category;
  }
  public get isSaved() {
    return this._isSaved;
  }
  public set isSaved(isSaved) {
    this._isSaved = isSaved;
  }

}
