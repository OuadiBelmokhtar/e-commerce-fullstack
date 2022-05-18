import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsGridViewComponent } from './products-grid-view/products-grid-view.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { CategoriesGridViewComponent } from './categories-grid-view/categories-grid-view.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { FrontofficeProductsGridViewComponent } from './frontoffice-products-grid-view/frontoffice-products-grid-view.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CaddiesComponent } from './caddies/caddies.component';
import { CustomerComponent } from './customer/customer.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: "home", component: AppComponent },
  { path: "products-grid", component: ProductsGridViewComponent },
  { path: "new-product", component: NewProductComponent },
  { path: "edit-product/:uriProductToEdit", component: EditProductComponent },
  { path: "categories-grid", component: CategoriesGridViewComponent },
  { path: "new-category", component: NewCategoryComponent },
  { path: "edit-category/:uriOfCategoryToEdit", component: EditCategoryComponent },
  { path: "frontoffice-products-grid/:showProductsMode/:categoryId", component: FrontofficeProductsGridViewComponent },
  { path: "login", component: LoginComponent },
  { path: "product-detail/:uriOfProductToShowDetail", component: ProductDetailComponent },
  { path: "caddies", component: CaddiesComponent },
  { path: "customer", component: CustomerComponent },
  { path: "payment/:orderId", component: PaymentComponent },
  { path: "", redirectTo: "frontoffice-products-grid/2/0", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
