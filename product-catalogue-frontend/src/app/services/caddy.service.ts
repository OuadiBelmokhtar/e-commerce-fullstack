import { Injectable } from '@angular/core';
import { Product } from '../models/Product.model';
import { CaddyItem } from '../models/CaddyItem.model';
import { Caddy } from '../models/Caddy.model';
import { Customer } from '../models/Customer.model';

@Injectable({
  providedIn: 'root'
})
export class CaddyService {

  //le nom du caddy sélectionné par le client
  private _currentCaddyName: string = "Caddy";
  //collection des caddies crées par le client
  private _caddies: Map<string, Caddy> = new Map();

  constructor() {
    // recuperer les caddies stockées en localSotrage. Si aucun caddy existe, créer un par défaut avec currentCaddyName
    if (this.loadAndGetCaddiesFromLocalStorage()) {
      this.caddies = this.loadAndGetCaddiesFromLocalStorage();// convertir de string a JSON

    } else {
      // creer un caddy par defaut lors du demarrage du service et l'ajouter au Map
      let defaultCaddy = new Caddy(this.currentCaddyName);
      this.caddies.set(this.currentCaddyName, defaultCaddy);
    }
    // console.log("constructor().caddies");
    // console.log(this.caddies);
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

    let currentCaddy = this.caddies.get(this.currentCaddyName);
    if (currentCaddy) {
      let currentCaddyItem = currentCaddy.caddyItems.get(addedProduct.id);
      if (currentCaddyItem) {
        currentCaddyItem.purchasedQuantity += addedProduct.orderedQuantity;

      } else {
        currentCaddyItem = new CaddyItem(addedProduct, addedProduct.currentPrice, addedProduct.orderedQuantity);
        currentCaddy.caddyItems.set(addedProduct.id, currentCaddyItem);

      }
      this.saveCaddiesToLocalStorage();
    }

  }

  getCurrentCaddy() {
    return this.caddies.get(this.currentCaddyName);
  }

  setCustomer(caddyCustomer: Customer) {
    this.getCurrentCaddy()!.customer = caddyCustomer;
  }

  getTotalAmountOfCurrentCaddy(): number {
    let totalAmount: number = 0;
    this.getCurrentCaddy()?.caddyItems.forEach(caddyItem => {
      totalAmount += caddyItem.buyingPrice * caddyItem.purchasedQuantity;
    });
    return totalAmount;
  }

  // enregistrer les caddies ds le localSotrage à chaque fois que j'ajoute un product au caddy
  saveCaddiesToLocalStorage() {
    // localStorage permet d'enregistrer les string seulement, alors on doit serialiser la map caddies 
    localStorage.setItem('myCaddies', JSON.stringify(this.caddies, this.replacer));
  }

  loadAndGetCaddiesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('myCaddies')!, this.reviver);
  }
 // vider le caddy courant. Appeler ds Payement.ts.onConfirmPayOrder()
  emptyCurrentCaddy(){
    this.getCurrentCaddy()?.caddyItems.clear();
  }

  // fonction requise pr serialiser la map caddies via JSON.stringify()
  private replacer(key: any, value: any) {
    if (value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()), // or with spread: value: [...value]
      };
    } else {
      return value;
    }
  }

  // fonction requise pr deserialiser la map caddies via JSON.parse()
  private reviver(key: any, value: any) {
    if (typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
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
