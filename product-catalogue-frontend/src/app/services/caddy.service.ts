import { Injectable } from '@angular/core';
import { Product } from '../model/Product.model';

@Injectable({
  providedIn: 'root'
})
export class CaddyService {

  /***
  - U
  */

  // currentCaddyName: le nom du caddy sélectionné par le client
  // caddies: collection des caddies crées par le client

  addProductToCaddy(product: Product) {
    // specifications fonctionnelles
    /* un client peut posséder plusieurs caddies, pr ajouter un productItem, il faut le faire ds le caddy courant.
     - step1: recuperer le caddy courant
     - step2: avant d'ajouter ds le caddy courant, il faut tt d'abord chercher si le productItem existe deja ds le caddy. 
       Si oui, on va juste maj productItemQuantity. Si le productItem n'existe pas ds le caddy on va l'ajouter.
       Noter bien qu'un ProductItem est associé a un Product. Par conséquent, un productItem est 
       identifié par le même ID/Ref que le Product y associé. De ce fait, la recherche d'un 
       productItem ds un caddy, se fait via productId. 
     - step3:  
    */

  }
  constructor() {
    // recuperer les caddies stockées en localSotrage. Si aucun caddy existe, créer un avec currentCaddyName
   }
}
