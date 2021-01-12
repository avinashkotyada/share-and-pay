import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DealerService {


  Reason : string
  Price : number
  Giver : string
  Receiver : string[]


  constructor() { }
}
