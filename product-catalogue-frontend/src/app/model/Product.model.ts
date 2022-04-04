
export class Product {

    private _id: number;
    private _designation: string;
    private _price: number;
    private _quantity: number;

    constructor(id: number, designation: string, price: number, quantity: number) {
        this._id = id;
        this._designation = designation;
        this._price = price;
        this._quantity = quantity;
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
}