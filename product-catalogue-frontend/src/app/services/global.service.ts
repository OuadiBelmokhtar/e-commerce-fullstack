import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// service de parametrage global
export class GlobalService {
  
public static HOST:string="http://localhost:8087";

//public static HOST:string="https://e-com-backend-prod.herokuapp.com";

  constructor() { }
}
