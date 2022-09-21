import { Injectable } from '@angular/core';
import { Payment } from '../models/Payment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public payment!: Payment;

  constructor(private httpClient: HttpClient, private authService:AuthenticationService) { }

  savePayment(payment: Payment) {
   return this.httpClient.post<Payment>(GlobalService.HOST + "/payments", payment,{headers:new HttpHeaders({'Authorization':"Bearer "+this.authService.getJwtAccessToken()})});
  }
}
