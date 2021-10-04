import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from './bar.component';
import { BarRoutingModule } from './bar-routing.module'


console.log("asdasd");

@NgModule({
  declarations: [
    BarComponent
  ],
  imports: [
    CommonModule,
    BarRoutingModule
  ],
  exports: [
    BarComponent
  ]
  })
export class BarModule { }
