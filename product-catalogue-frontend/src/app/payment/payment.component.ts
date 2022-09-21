import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { Order } from '../models/Order.model';
import { OrderService } from '../services/order.service';
import { Payment } from '../models/Payment.model';
import { CaddyService } from '../services/caddy.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  private _orderId!: number;
  private _panelStyle: string = 'panel-default';
  private _associatedOrder!: Order;
  private _confirmationMsg: string = "";
  private _viewMode: number = 0;

  constructor(public paymentService: PaymentService, private orderService: OrderService, 
    private caddyService:CaddyService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // recup orderId passe ds url
    this._orderId = this.activatedRoute.snapshot.params['orderId'];
    // recup l'Ordre correspond a orderId
    this.orderService.getOrder(this._orderId).subscribe(response => {
      this._associatedOrder = response;
      console.log("this._associatedOrder");
      console.log(this._associatedOrder);
    }, err => {
      console.log(err);
    })
  }

  onConfirmPayOrder(paymentFormFields: any) {
    // console.log("paymentFormFields");
    // console.log(paymentFormFields);
    this.paymentService.payment=new Payment();
    this.paymentService.payment.datePayment = new Date();
    this.paymentService.payment.cardType = paymentFormFields.cardType;
    this.paymentService.payment.cardNumber = paymentFormFields.cardNumber;
    this.paymentService.payment.order = new Order();
    this.paymentService.payment.order.id = paymentFormFields.orderId;
    // envoyer le payment pr le sauvegarder ds la BD 
    this.paymentService.savePayment(this.paymentService.payment)
      .subscribe(response => {
        // afficher un msg de confirmation avec la reference du paiement renvoyee par le backend
        this._confirmationMsg="Paiement effectué avec succès suos la référence: "+response.referencePayment+"";
        this._panelStyle="panel-success";
        // pr l affichage du message de confirmation
        this._viewMode=1;
        // vider le caddy courant après avoir effectuer le paiement
        this.caddyService.emptyCurrentCaddy();
      }, err => {
        this._confirmationMsg="Erreur de Paiement, veuillez ressayer ultérieurement."
        this._panelStyle="panel-danger";
        // pr l affichage du message d erreur
        this._viewMode=1;
        console.log(err);
      })

  }

  public get orderId(): number {
    return this._orderId;
  }
  public set orderId(value: number) {
    this._orderId = value;
  }
  public get panelStyle(): string {
    return this._panelStyle;
  }
  public set panelStyle(value: string) {
    this._panelStyle = value;
  }
  public get associatedOrder(): Order {
    return this._associatedOrder;
  }
  public set associatedOrder(value: Order) {
    this._associatedOrder = value;
  }
  public get confirmationMsg(): string {
    return this._confirmationMsg;
  }
  public set confirmationMsg(value: string) {
    this._confirmationMsg = value;
  }
  public get viewMode(): number {
    return this._viewMode;
  }
  public set viewMode(value: number) {
    this._viewMode = value;
  }
}
