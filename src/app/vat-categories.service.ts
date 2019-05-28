import { Injectable } from '@angular/core';

export enum VatCategory {
  Food,
  Drinks
}

@Injectable({
  providedIn: 'root'
})
export class VatCategoriesService {

  constructor() { }

  public getVat(category: VatCategory): number {
    switch(category){
      case VatCategory.Drinks:return 10;
      case VatCategory.Food:return 20;
      default: return NaN;
    }
  }
}
