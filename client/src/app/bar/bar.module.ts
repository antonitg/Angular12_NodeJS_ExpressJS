import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from './bar.component';
import { BarRoutingModule } from './bar-routing.module'
import { ListValorationsComponent } from '../shared/valorations/list-valorations/list-valorations.component';
import { ValorationsModule } from '../shared/valorations/valorations.module';
import { ProductModule } from '../shared/product/product.module';


console.log("asdasd");

@NgModule({
  declarations: [
    BarComponent,


  ],
  imports: [
    CommonModule,
    BarRoutingModule,
    ValorationsModule,
    ProductModule
  ],
  exports: [
    BarComponent
  ]
  })
export class BarModule { }
