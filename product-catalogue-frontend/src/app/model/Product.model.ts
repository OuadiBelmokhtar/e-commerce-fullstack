import { Category } from './Category.model';

export class Product {

    private _id: number;
    private _designation: string;
    private _price: number;
    private _quantity: number;
    private _productCategory: Category; // tu gardes ce nom, pr faire marcher la persistance de l'association correctement
    public _links:any;
    public _embedded:any;

    constructor(id: number, designation: string, price: number, quantity: number, category: Category) {
        this._id = id;
        this._designation = designation;
        this._price = price;
        this._quantity = quantity;
        this._productCategory = category;
    }

    public get id() {
        return this._id;
    }
    public get designation() {
        return this._designation;
    }
    public get price() {
        return this._price;
    }
    public get quantity() {
        return this._quantity;
    }
    public get productCategory() { // tu gardes ce nom, pr faire marcher la persistance de l'association correctement
        return this._productCategory;
    }

    public set id(id: number) {
        this._id = id;
    }
    public set designation(designation: string) {
        this._designation = designation;
    }
    public set price(price: number) {
        this._price = price;
    }
    public set quantity(quantity: number) {
        this._quantity = quantity;
    }
    public set productCategory(category: Category) { // tu gardes ce nom, pr faire marcher la persistance de l'association correctement
        this._productCategory = category;
    }
}