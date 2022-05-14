import { Customer } from './Customer.model';
import { CaddyItem } from './CaddyItem.model';

export class Caddy{
    // garder ces attributs public. Obligatoire pr faire fonctionner JSON.parse de la Map

    public name: string;
    // stocke l'ID du product et le caddyItem y associé
    public caddyItems:Map<number, CaddyItem> = new Map();
    public customer: Customer= { name: "", address: "", phoneNumber: "", email: "", username: "" }; // util pr envoyer le caddy au backend avec les infos du client
    
    constructor(name:string){
        this.name=name;
    }
// les getters/setters posent des problèmes(lors de la serialization/deserialization JSON) pr ce cas d'usage
  
}