import { Component, OnInit } from '@angular/core';
import { CaddyService } from '../services/caddy.service';
import { Customer } from '../models/Customer.model';
import { AuthenticationService } from '../services/authentication.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  private _viewMode: number = 0;
  // pr afficher un message de confirmation en vert lors de la confirmation de la commande
  private _panelStyle: string = "panel-default";
  public confirmationMsg:string="Récap de votre commande";

  constructor(public caddyService: CaddyService, public orderService: OrderService, 
    private authenticationService: AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }

  onSaveCustomerInfos(savingCustomerFormFields: any) {
    console.log("savingCustomerFormFields");
    console.log(savingCustomerFormFields);
    // recup username et l'ajter au donnees recu du formulaire
    savingCustomerFormFields.username = this.authenticationService.username;
    // initialiser customer de caddyService.caddy, car on en aura besoin par la suite
    this.caddyService.setCustomer(savingCustomerFormFields);
    // initialiser customer de caddyService.order, car on en aura besoin par la suite 
    // pr afficher les infos customer ds le bon de commande, et pr le tranmettre au backend
    this.orderService.setCustomer(savingCustomerFormFields);
    // charger les caddyItem de getCurrentCaddy() ds order.orderedProducts pr les afficher ds le bon de cmd
    this.orderService.loadProductsFromCurrentCaddyToOrder();
    this.viewMode = 1;
  }

  onConfirmOrder() {
    this.orderService.submitAndSaveOrder().subscribe(response => {
      // response represente l'objet Order retourne du backend
      this.orderService.order.id = response.id;
      this.orderService.order.date = response.date;
      this.panelStyle = "panel-success";
      this.confirmationMsg="Commande bien enregistrée";
    }, err=>{
      this.confirmationMsg="Erreur d'enregistrement de la commande, veuillez ressayer ultérieurement."
      this.panelStyle = "panel-danger";
      console.log(err);
    })
  }

  onPayOrder() {
    this.router.navigateByUrl("/payment/"+this.orderService.order.id);
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
