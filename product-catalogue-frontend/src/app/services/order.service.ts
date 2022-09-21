import { Injectable } from '@angular/core';
import { Order } from '../models/Order.model';
import { Customer } from '../models/Customer.model';
import { CaddyService } from './caddy.service';
import { CaddyItem } from '../models/CaddyItem.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public order: Order = new Order(); // il faut l insctancier, sinon il va avoir undefined lors de la manipualtion ds d'autres components

  constructor(private caddyService: CaddyService, private httpClient:HttpClient, private authService:AuthenticationService) { }


  public setCustomer(customer: Customer) {
    this.order.customer = customer;
  }

  // charger les caddyItem de getCurrentCaddy() ds order.orderedProducts
  loadProductsFromCurrentCaddyToOrder() {
    this.order.orderedProducts = new Array();
    this.caddyService.getCurrentCaddy()?.caddyItems.forEach(caddyItem => {
      this.order.orderedProducts.push(caddyItem);
    });
    // for(let caddyItemKey in this.caddyService.getCurrentCaddy()?.caddyItems.keys()){
    //   this.order.orderedProducts.push(this.caddyService.getCurrentCaddy()?.caddyItems.get(caddyItemKey)!);
    // }
  }

  submitAndSaveOrder(){
    /* noter bien que l'objet this.order envoyé ds la requete contient :
     - this.order.customer les infos sur le customer, initialisées ds customer.component.ts.onSaveCustomerInfos()
     - this.order.orderedProducts: les products existent ds le panier et chargés ds this.loadProductsFromCurrentCaddyToOrder()
    */
    return this.httpClient.post<Order>(GlobalService.HOST+"/orders", this.order,{headers:new HttpHeaders({'Authorization':"Bearer "+this.authService.getJwtAccessToken()})});
  }

  getOrder(id:number){
    return this.httpClient.get<Order>(GlobalService.HOST+"/orders/"+id,{headers:new HttpHeaders({'Authorization':"Bearer "+this.authService.getJwtAccessToken()})});
  }
}
