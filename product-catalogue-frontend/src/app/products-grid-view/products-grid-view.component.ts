import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';

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

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
  }

  onSearchProducts(formContent: any) {
    //console.log(formContent);
    this.pageNbr = 0;
    this.searchKeyword = formContent.keyword;
    this.searchProducts();
  }

  onNavigateToPage(pNbr: number) {
    //console.log(pNbr);
    this.pageNbr = pNbr;
    this.searchProducts();
  }

  private searchProducts() {
    this.productService.searchProducts(this.searchKeyword, this.pageNbr, this.nbrEltPerPage)
      .subscribe(data => {
        this.jsonProducts = data;
        this.pagesArray = new Array<number>(this.jsonProducts.page.totalPages);
      }, err => {
        console.log(err);
      })
  }

  onSupprimerProduct(p: any) {
    //console.log(p);
    let URI = p._links.self.href;
    //console.log(URI);
    this.productService.supprimerProduct(URI)
      .subscribe(data => {
        this.searchProducts();
      }, err => {
        console.log(err);
      })
  }

}
