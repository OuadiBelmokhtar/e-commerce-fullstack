import { Injectable } from '@angular/core';
import { Product } from '../model/Product.model';
import { CaddyItem } from '../model/CaddyItem.model';
import { Caddy } from '../model/Caddy.model';

@Injectable({
  providedIn: 'root'
})
export class CaddyService {

  //le nom du caddy sélectionné par le client
  private _currentCaddyName: string = "Caddy1";
  //collection des caddies crées par le client
  private _caddies: Map<string, Caddy> = new Map();

  constructor() {
    // recuperer les caddies stockées en localSotrage. Si aucun caddy existe, créer un avec currentCaddyName
    //...
    // creer un caddy par defaut lors du demarrage du service et l'ajouter au Map
    let defaultCaddy = new Caddy(this.currentCaddyName);
    this.caddies.set(this.currentCaddyName, defaultCaddy);
  }

  addProductToCaddy(addedProduct: Product) {
    // specifications fonctionnelles
    /* un client peut posséder plusieurs caddies, pr ajouter un caddyItem, il faut le faire ds le caddy courant.
     - step1: recuperer le caddy courant
     - step2: avant d'ajouter ds le caddy courant, il faut tt d'abord chercher si le caddyItem existe deja ds le caddy. 
       Si oui, on va juste maj caddyItemQuantity. Si le caddyItem n'existe pas ds le caddy on va l'ajouter.
       Noter bien qu'un caddyItem est associé a un Product. Par conséquent, un caddyItem est 
       identifié par le même ID/Ref que le Product y associé. De ce fait, la recherche d'un 
       caddyItem ds un caddy, se fait via productId. 
     - step3:  
    */

   let currentCaddy=this.caddies.get(this.currentCaddyName);
   if(currentCaddy){
     let currentCaddyItem=currentCaddy.caddyItems.get(addedProduct.id);
     if(currentCaddyItem){
       currentCaddyItem.purchasedQuantity+=addedProduct.orderedQuantity;

     }else{
      currentCaddyItem=new CaddyItem(addedProduct, addedProduct.currentPrice,addedProduct.orderedQuantity);
      currentCaddy.caddyItems.set(addedProduct.id, currentCaddyItem);
     }
   }   
  }

  public get currentCaddyName(): string {
    return this._currentCaddyName;
  }
  public set currentCaddyName(value: string) {
    this._currentCaddyName = value;
  }
  public get caddies(): Map<string, Caddy> {
    return this._caddies;
  }
  public set caddies(value: Map<string, Caddy>) {
    this._caddies = value;
  }
}
