import { Injectable } from '@angular/core';
import { VatCategory, VatCategoriesService } from './vat-categories.service';
import { unusedValueExportToPlacateAjd } from '@angular/core/src/render3/interfaces/node';
import { InvokeFunctionExpr } from '@angular/compiler';

export interface InvoiceLine {
  product: string;
  vatCategory: VatCategory;
  priceInclusiveVat: number;
}

export interface InvoiceLineComplete extends InvoiceLine {
  priceExclusiveVat: number;
}

export interface Invoice {
  invoiceLines: InvoiceLineComplete[];
  totalPriceInclusiveVat: number;
  totalPriceExclusiveVat: number;
  totalVat: number;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceCalculatorService {

  constructor(private vatCategoriesService: VatCategoriesService) { }

  public CalculatePriceExclusiveVat(priceInclusiveVat: number, vatPercentage: number): number {
    return (priceInclusiveVat / (100 + vatPercentage)) * 100;
  }

  public CalculateInvoice(invoiceLines: InvoiceLine[]): Invoice {
    if (!invoiceLines || invoiceLines === null || invoiceLines.length === 0) {
      return null;
    }
    let totalExclVat = 0;
    let totalInclVat = 0;
    let totalVat = 0;
    let invoiceLinesComplete: InvoiceLineComplete[] = [];

    for (let i = 0; i < invoiceLines.length; i++) {
      let curVat = this.vatCategoriesService.getVat(invoiceLines[i].vatCategory);
      let priceExclVat = this.CalculatePriceExclusiveVat(invoiceLines[i].priceInclusiveVat, curVat);
      totalVat += curVat;
      totalExclVat += priceExclVat;
      totalInclVat += invoiceLines[i].priceInclusiveVat;
      invoiceLinesComplete.push({
        product: invoiceLines[i].product, vatCategory: invoiceLines[i].vatCategory,
        priceInclusiveVat: invoiceLines[i].priceInclusiveVat, priceExclusiveVat: priceExclVat
      });
    }
    return { invoiceLines: invoiceLinesComplete, totalPriceExclusiveVat: totalExclVat, totalPriceInclusiveVat: totalInclVat, totalVat: totalVat };
  }
}
