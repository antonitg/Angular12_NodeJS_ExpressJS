import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreateComponent } from './product-create.component'
import { ProductRoutingModule } from './product-routing.module';
import { Star } from 'lucide-angular';
import { ListProductsComponent } from './list-products/list-products.component';

@NgModule({
  declarations: [
    ProductCreateComponent,
    ListProductsComponent
  ],
  exports: [
    ProductCreateComponent,
    ListProductsComponent

  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
  ]
})
export class ProductModule { }
