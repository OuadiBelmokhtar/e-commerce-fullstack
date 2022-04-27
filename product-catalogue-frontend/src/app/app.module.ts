import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsGridViewComponent } from './products-grid-view/products-grid-view.component';
import { NewProductComponent } from './new-product/new-product.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditProductComponent } from './edit-product/edit-product.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { CategoriesGridViewComponent } from './categories-grid-view/categories-grid-view.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { FrontofficeProductsGridViewComponent } from './frontoffice-products-grid-view/frontoffice-products-grid-view.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsGridViewComponent,
    NewProductComponent,
    EditProductComponent,
    NewCategoryComponent,
    CategoriesGridViewComponent,
    EditCategoryComponent,
    FrontofficeProductsGridViewComponent,
    LoginComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
