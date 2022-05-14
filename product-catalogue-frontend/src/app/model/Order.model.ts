import { CaddyItem } from './CaddyItem.model';
import { Customer } from './Customer.model';
export class Order {
    public id!: number;
    public customer: Customer = { name: "", address: "", phoneNumber: "", email: "", username: "" };
    public orderedProducts: Array<CaddyItem> = [];
    public totalAmount!: number;
    public date!: Date;

    constructor() {
        
    }

}