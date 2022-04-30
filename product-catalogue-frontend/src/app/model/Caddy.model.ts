import { Customer } from './Customer.model';
import { CaddyItem } from './CaddyItem.model';

export class Caddy{
    private _name: string;
    // stocke le nom du caddy et les elts qu'elle contient
    public caddyItems:Map<string, CaddyItem>=new Map();
    private _customer!: Customer; // util pr envoyer le caddy au backend avec les infos du client
    
    constructor(name:string){
        this._name=name;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get customer(): Customer {
        return this._customer;
    }
    public set customer(value: Customer) {
        this._customer = value;
    }
}