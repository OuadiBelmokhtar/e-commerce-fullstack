import { Injectable } from '@angular/core';
import { Payment } from '../model/Payment.model';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public payment!: Payment;

  constructor(private httpClient: HttpClient) { }

  savePayment(payment: Payment) {
   return this.httpClient.post<Payment>(GlobalService.HOST + "/payments", payment);
  }
}
