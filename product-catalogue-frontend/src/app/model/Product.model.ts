import { Category } from './Category.model';

export class Product {

    private _id: number;
    private _reference: string = "";
    private _designation: string;
    private _description: string;
    private _currentPrice: number;
    private _promotion: boolean;
    private _selected: boolean;
    private _available: boolean;
    private _photoName: string;
    private _quantity: number;
    private _productCategory: Category; // tu gardes ce nom, pr faire marcher la persistance de l'association correctement
    public _links: any; // garder le public
    public _embedded: any;// garder le public

    constructor(id: number, designation: string, description: string, price: number, promotion: boolean, selected: boolean, available: boolean, photoName: string, quantity: number, category: Category) {
        this._id = id;
        this._designation = designation;
        this._description = description;
        this._currentPrice = price;
        this._promotion = promotion;
        this._selected = selected;
        this._available = available;
        this._photoName = photoName;
        this._quantity = quantity;
        this._productCategory = category;
    }

    public get id() {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get reference() {
        return this._reference;
    }
    public set reference(reference: string) {
        this._reference = reference;
    }
    public get designation() {
        return this._designation;
    }
    public set designation(designation: string) {
        this._designation = designation;
    }
    public get currentPrice() {
        return this._currentPrice;
    }
    public set currentPrice(price: number) {
        this._currentPrice = price;
    }
    public get promotion(): boolean {
        return this._promotion;
    }
    public set promotion(value: boolean) {
        this._promotion = value;
    }
    public get selected(): boolean {
        return this._selected;
    }
    public set selected(value: boolean) {
        this._selected = value;
    }
    public get available(): boolean {
        return this._available;
    }
    public set available(value: boolean) {
        this._available = value;
    }
    public get quantity() {
        return this._quantity;
    }
    public set quantity(quantity: number) {
        this._quantity = quantity;
    }
    public get productCategory() { // tu gardes ce nom, pr faire marcher la persistance de l'association correctement
        return this._productCategory;
    }
    public set productCategory(category: Category) { // tu gardes ce nom, pr faire marcher la persistance de l'association correctement
        this._productCategory = category;
    }

    public get photoName(): string {
        return this._photoName;
    }
    public set photoName(value: string) {
        this._photoName = value;
    }
  
}