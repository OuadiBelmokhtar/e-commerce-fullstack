import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { Product } from '../model/Product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-grid-view',
  templateUrl: './products-grid-view.component.html',
  styleUrls: ['./products-grid-view.component.css']
})
export class ProductsGridViewComponent implements OnInit {

  public jsonProducts: any = undefined;
  public pagesArray: Array<number> = [];
  public pageNbr: number = 0;
  public nbrEltPerPage: number = 5;
  private searchKeyword: string = "";

  constructor(private productService: ProductService, private router: Router) {

  }

  ngOnInit(): void {
  }

  onSearchProducts(searchFormFields: any) {
    //console.log(formFields);
    // Noter bien que searchFormFields sera transmit au Model en format JSON comme suite {"fieldName1": value1, "fieldName2": value2}
    this.pageNbr = 0;
    this.searchKeyword = searchFormFields.keyword;
    this.getProducts();
  }

  onNavigateToPage(pNbr: number) {
    //console.log(pNbr);
    this.pageNbr = pNbr;
    this.getProducts();
  }

  private getProducts() {
    this.productService.searchProductsByKeyword(this.searchKeyword, this.pageNbr, this.nbrEltPerPage)
      .subscribe(data => {
        this.jsonProducts = data;
        this.pagesArray = new Array<number>(this.jsonProducts.page.totalPages);
      }, err => {
        console.log(err);
      })
  }

  onDeleteProduct(product: any) {
    //console.log(product);
    // pr construire lURI on peut soit exploiter le lien autogenere par Spring Data Rest, ou le construire manuellement
    // via URI="http://localhost:8087/products/"+product.id
    let URI = product._links.self.href;
    //console.log(URI);
    let confirmDeletion = confirm("Etes-vous sure de supprimer le produit: " + product.id + " ?");
    if (confirmDeletion) {
      this.productService.deleteProduct(URI)
        .subscribe(data => {
          this.getProducts();
        }, err => {
          console.log(err);
        })
    }
  }

  onEditProduct(product: any) {
    this.router.navigateByUrl('edit-product/' + btoa(product._links.self.href));
  }

 

}
