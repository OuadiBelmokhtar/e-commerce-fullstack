import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsGridViewComponent } from './products-grid-view/products-grid-view.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  { path: "products-grid", component: ProductsGridViewComponent },
  { path: "new-product", component: NewProductComponent },
  { path: "edit-product/:uriProductToEdit", component: EditProductComponent },
  { path: "", redirectTo: "products-grid", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
