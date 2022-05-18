import { Order } from './Order.model';
export class Payment {
    public id!: number;
    public datePayment!: Date;
    public cardNumber!: string;
    public cardType!: string;
    public referencePayment: string = "";
    public order!: Order;
}