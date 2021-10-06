import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
})
export class ListProductsComponent implements OnInit {
  @Input('prod') prod!: any;
  lowPrice: any;
  constructor() {}
  ngOnInit(): void {
    this.lowPrice = this.prod.types.reduce(function (prev: any, curr: any) {
      return prev.preu < curr.preu ? prev : curr;
    });
  }
}
