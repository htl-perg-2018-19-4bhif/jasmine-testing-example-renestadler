import { Component } from '@angular/core';
import { InvoiceLine, InvoiceCalculatorService, Invoice, InvoiceLineComplete } from './invoice-calculator.service';
import { VatCategory } from './vat-categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  invoiceLines: InvoiceLine[] = [];
  resultInvoiceLines = [];
  invoice: Invoice;

  totalPriceInclusiveVat:string;
  totalPriceExclusiveVat:string;
  product = '';
  priceInclusiveVat = 0;
  vatCategoryString = 'Food';

  vatCategories = VatCategory;

  constructor(private invoiceCalculator: InvoiceCalculatorService) {
   }

  addInvoice() {
    let vatCategory;
    if(this.vatCategoryString==='Food'){
      vatCategory=this.vatCategories.Food;
    }else{
      vatCategory=this.vatCategories.Drinks;
    }
    this.invoiceLines.push({product:this.product,vatCategory:vatCategory,priceInclusiveVat:this.priceInclusiveVat});
    this.invoice=this.invoiceCalculator.CalculateInvoice(this.invoiceLines);
    this.resultInvoiceLines=[];
    for (let i = 0; i < this.invoice.invoiceLines.length; i++) {
      const element = this.invoice.invoiceLines[i];
      let exclVat=parseFloat(Math.round(element.priceExclusiveVat * 100) / 100+'').toFixed(2);
      let inclVat=parseFloat(Math.round(element.priceInclusiveVat * 100) / 100+'').toFixed(2);
      this.resultInvoiceLines.push({priceExclusiveVat:exclVat,priceInclusiveVat:inclVat,product:element.product,vatCategory:element.vatCategory});
    }
    this.totalPriceExclusiveVat=parseFloat(Math.round(this.invoice.totalPriceExclusiveVat * 100) / 100+'').toFixed(2);
    this.totalPriceInclusiveVat=parseFloat(Math.round(this.invoice.totalPriceInclusiveVat * 100) / 100+'').toFixed(2);
  }
}
