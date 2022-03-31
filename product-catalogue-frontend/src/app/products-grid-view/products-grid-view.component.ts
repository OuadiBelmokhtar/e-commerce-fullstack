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
  public pagesArray:Array<number>=[];
  public pageNbr:number=0;
  public nbrEltPerPage:number=5;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  onGetProducts() {
    let totalPages=0;
    this.productService.getProducts(this.pageNbr,this.nbrEltPerPage)
      .subscribe(data => { this.jsonProducts = data; totalPages=this.jsonProducts.page.totalPages; this.pagesArray=new Array<number>(totalPages);console.log(totalPages)}, err => { console.log(err) });
      
      
      
  }
}
