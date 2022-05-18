import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { Order } from '../model/Order.model';
import { OrderService } from '../services/order.service';
import { Payment } from '../model/Payment.model';

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
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._orderId = this.activatedRoute.snapshot.params['orderId'];
    this.orderService.getOrder(this._orderId).subscribe(response => {
      this._associatedOrder = response;
      console.log("this._associatedOrder");
      console.log(this._associatedOrder);
    }, err => {
      console.log(err);
    })
  }

  onConfirmPayOrder(paymentFormFields: any) {
    console.log("paymentFormFields");
    console.log(paymentFormFields);
    this.paymentService.payment=new Payment();
    this.paymentService.payment.datePayment = new Date();
    this.paymentService.payment.cardType = paymentFormFields.cardType;
    this.paymentService.payment.cardNumber = paymentFormFields.cardNumber;
    this.paymentService.payment.order = new Order();
    this.paymentService.payment.order.id = paymentFormFields.orderId;
    this.paymentService.savePayment(this.paymentService.payment)
      .subscribe(response => {
        this._confirmationMsg="Paiement effectué avec succès suos la référence: <b>"+response.referencePayment+"</b>";
        this._panelStyle="panel-success";
        this._viewMode=1;
      }, err => {
        this._confirmationMsg="Erreur de Paiement, veuillez ressayer ultérieurement."
        this._panelStyle="panel-danger";
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
