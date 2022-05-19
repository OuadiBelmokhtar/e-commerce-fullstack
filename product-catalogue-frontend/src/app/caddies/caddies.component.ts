import { Component, OnInit } from '@angular/core';
import { CaddyService } from '../services/caddy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caddies',
  templateUrl: './caddies.component.html',
  styleUrls: ['./caddies.component.css']
})
export class CaddiesComponent implements OnInit {

  constructor(public caddyService: CaddyService, private router: Router) { }

  ngOnInit(): void {
  }

  onRemoveCaddyItemFromCaddy(clickedCaddyItemKey: number) {
    // supprimer le caddyItem de la Map
    this.caddyService.getCurrentCaddy()?.caddyItems.delete(clickedCaddyItemKey);
    // maj localStorage pr tenir compte la suppression
    this.caddyService.saveCaddiesToLocalStorage();
  }

  onCreateNewOrder() {
    this.router.navigateByUrl('/customer');
  }

}
