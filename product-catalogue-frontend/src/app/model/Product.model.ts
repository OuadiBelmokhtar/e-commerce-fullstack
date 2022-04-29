import { Category } from './Category.model';

export class Product {

    private _id: number;
    private _reference: string = "";
    private _designation: string;
    private _description: string;
    private _currentPrice: number;
    private _isOnPromotion: boolean;
    private _isSelected: boolean;
    private _isAvailable: boolean;
    private _photoName: string;
    private _quantity: number;
    // Sert a afficher la quantite par defaut a commander ds le champ 'input type=number' ds la page web
    private _orderedQuantity: number;
    private _productCategory: Category; // tu gardes ce nom, pr faire marcher la persistance de l'association correctement
    public _embedded: any;// garder le public
    public _links!: {// garder le public
        self: {
            href: string
        },
        category: {
            href: string
        }
    }

    constructor(id: number, designation: string, description: string, price: number, promotion: boolean, selected: boolean, available: boolean, photoName: string, quantity: number, orderedQuantity: number, category: Category) {
        this._id = id;
        this._designation = designation;
        this._description = description;
        this._currentPrice = price;
        this._isOnPromotion = promotion;
        this._isSelected = selected;
        this._isAvailable = available;
        this._photoName = photoName;
        this._quantity = quantity;
        this._orderedQuantity = orderedQuantity;
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

    public get isOnPromotion(): boolean {
        return this._isOnPromotion;
    }
    public set isOnPromotion(value: boolean) {
        this._isOnPromotion = value;
    }
    public get isSelected(): boolean {
        return this._isSelected;
    }
    public set isSelected(value: boolean) {
        this._isSelected = value;
    }
    public get isAvailable(): boolean {
        return this._isAvailable;
    }
    public set isAvailable(value: boolean) {
        this._isAvailable = value;
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
    public get orderedQuantity(): number {
        return this._orderedQuantity;
    }
    public set orderedQuantity(value: number) {
        this._orderedQuantity = value;
    }

}