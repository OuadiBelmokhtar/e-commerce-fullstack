import { Product } from './Product.model';
// represente la classe ProductItem utilisee ds le tuto
export class CaddyItem {
    // garder ces attributs public. Obligatoire pr faire fonctionner JSON.parse de la Map
    public associatedProduct: Product;
    public buyingPrice: number;
    public purchasedQuantity: number;
    // private _discount:number; if needed

    constructor(associatedProduct: Product, buyingPrice: number, purchasedQuantity: number) {
        this.associatedProduct = associatedProduct;
        this.buyingPrice = buyingPrice;
        this.purchasedQuantity = purchasedQuantity;
    }
    // les getters/setters posent des problèmes(lors de la serialization/deserialization JSON) pr ce cas d'usage
}