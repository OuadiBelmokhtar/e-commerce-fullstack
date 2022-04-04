import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// service de parametrage global
export class GlobalService {
  
public static HOST:string="http://localhost:8087";

  constructor() { }
}
