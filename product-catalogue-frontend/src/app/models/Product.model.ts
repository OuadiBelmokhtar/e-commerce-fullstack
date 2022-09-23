import { Category } from './Category.model';

export class Product {

    public id: number;
    public reference: string = "";
    public designation: string;
    public description: string;
    public currentPrice: number;
    public isOnPromotion: boolean;
    public isSelected: boolean;
    public isAvailable: boolean;
    public photoName: string;
    // quantite en stock
    public quantity: number;
    // Sert pr: afficher la quantite par defaut a commander ds le champ 'input type=number' ds la page web. Ainsi que pour stocker la quantite ajoutée au panier
    public orderedQuantity: number;
    public productCategory: Category; // tu gardes ce nom, pr faire marcher la persistance de l'association correctement
    public _embedded: any;// garder le public
    public _links!: {// garder le public
        self: {
            href: string
        },
        category: {
            href: string
        }
    }

    constructor(id: number,reference:string, designation: string, description: string, price: number, promotion: boolean, selected: boolean, available: boolean, photoName: string, quantity: number, orderedQuantity: number, category: Category) {
        this.id = id;
        this.reference=reference;
        this.designation = designation;
        this.description = description;
        this.currentPrice = price;
        this.isOnPromotion = promotion;
        this.isSelected = selected;
        this.isAvailable = available;
        // on stocke l URL ds la BD, non pas le nom
        this.photoName = photoName;
        this.quantity = quantity;
        this.orderedQuantity = orderedQuantity;
        this.productCategory = category;
    }

   // les getters/setters posent des problèmes(lors de la serialization/deserialization JSON) pr ce cas d'usage


}