import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/Category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  private _categoryToEdit!: Category;
  

  constructor(private categoryService: CategoryService, private activatedRoute: ActivatedRoute, private router:Router) {

  }

  ngOnInit(): void {
    let uriOfCateogryToEdit = atob(this.activatedRoute.snapshot.params['uriOfCategoryToEdit'])
    // console.log(uriOfCateogryToEdit);
    this.setCategoryToEdit(uriOfCateogryToEdit);

  }

  private setCategoryToEdit(uri: string) {
    this.categoryService.getCategory(uri)
      .subscribe(response => {
        this._categoryToEdit = response;
      }, err => {
        console.log(err);
      });
  }

  updateCategory(editingFormFields:any){
    // console.log('editingFormFields');
    // console.log(editingFormFields);
    // console.log('uriCateogryToEdit');
    // console.log(this._categoryToEdit._links.self.href);
    this.categoryService.patchCategory(this._categoryToEdit._links.self.href,editingFormFields)
    .subscribe(response=>{
      //reponse vide
      console.log("Maj avec succès");
      this.router.navigateByUrl('/categories-grid')
    }, err=>{
      console.log(err);
    });
  }

  public get categoryToEdit() {
    return this._categoryToEdit;
  }
  public set categoryToEdit(category) {
    this._categoryToEdit = category;
  }

}
