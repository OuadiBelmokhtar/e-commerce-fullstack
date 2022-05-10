import { Product } from './Product.model';
// represente la classe ProductItem utilisee ds le tuto
export class CaddyItem {
    private _associatedProduct: Product;
    private _buyingPrice: number;
    private _purchasedQuantity: number;
    // private _discount:number; if needed

    constructor(associatedProduct: Product, buyingPrice: number, purchasedQuantity: number) {
        this._associatedProduct = associatedProduct;
        this._buyingPrice = buyingPrice;
        this._purchasedQuantity = purchasedQuantity;
    }
    public get associatedProduct(): Product {
        return this._associatedProduct;
    }
    public set associatedProduct(value: Product) {
        this._associatedProduct = value;
    }
    public get buyingPrice(): number {
        return this._buyingPrice;
    }
    public set buyingPrice(value: number) {
        this._buyingPrice = value;
    }
    public get purchasedQuantity(): number {
        return this._purchasedQuantity;
    }
    public set purchasedQuantity(value: number) {
        this._purchasedQuantity = value;
    }
}