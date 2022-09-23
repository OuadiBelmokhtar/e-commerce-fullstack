import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Firebase modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';


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
import { CaddiesComponent } from './caddies/caddies.component';
import { CustomerComponent } from './customer/customer.component';
import { PaymentComponent } from './payment/payment.component';
import { UploadFormComponent } from './upload-form/upload-form.component';

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
    ProductDetailComponent,
    CaddiesComponent,
    CustomerComponent,
    PaymentComponent,
    UploadFormComponent
  ],
  imports: [
    // Firebase modules
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
