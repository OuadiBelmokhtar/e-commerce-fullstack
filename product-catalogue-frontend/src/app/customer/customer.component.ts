import { Component, OnInit } from '@angular/core';
import { CaddyService } from '../services/caddy.service';
import { Customer } from '../model/Customer.model';
import { AuthenticationService } from '../services/authentication.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  private _viewMode: number = 0;
  // pr afficher un message de confirmation en vert lors de la confirmation de la commande
  private _panelStyle: string="panel-default";
  
  constructor(public caddyService: CaddyService, public orderService: OrderService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSaveCustomerInfos(savingCustomerFormFields: any) {
    console.log("savingCustomerFormFields");
    console.log(savingCustomerFormFields);
    // recup username et l'ajter au donnees recu du formaulaire
    savingCustomerFormFields.username = this.authenticationService.authenticatedUser.username;
    // initialiser customer de caddyService.caddy, car on en aura besoin par la suite
    this.caddyService.setCustomer(savingCustomerFormFields);
    // initialiser customer de caddyService.order, car on en aura besoin par la suite pr afficher le bon de commande
    this.orderService.setCustomer(savingCustomerFormFields);
    this.orderService.loadProductsFromCurrentCaddyToOrder();
    this.viewMode=1;
  }

  onConfirmOrder(){
  
  }

  onPayOrder(){

  }

  public get viewMode(): number {
    return this._viewMode;
  }
  public set viewMode(value: number) {
    this._viewMode = value;
  }
  public get panelStyle(): string {
    return this._panelStyle;
  }
  public set panelStyle(value: string) {
    this._panelStyle = value;
  }
}
