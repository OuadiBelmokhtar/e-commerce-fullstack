import { Component, OnInit } from '@angular/core';
import { CaddyService } from '../services/caddy.service';
import { CaddyItem } from '../model/CaddyItem.model';
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

  onRemoveCaddyItemFromCaddy(clickedCaddyItem: CaddyItem) {

  }

  onCreateNewOrder() {
    this.router.navigateByUrl('/customer');
  }

}
