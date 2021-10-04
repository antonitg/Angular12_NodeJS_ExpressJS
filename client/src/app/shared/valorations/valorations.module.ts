import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListValorationsComponent } from './list-valorations/list-valorations.component';
import { List, Star } from 'lucide-angular';
import { ValorationsService } from 'src/app/core';
import { LucideAngularModule } from 'lucide-angular';




@NgModule({
  declarations: [
    ListValorationsComponent,
  ],
  imports: [
    CommonModule,
    LucideAngularModule.pick({
      Star,
    })
  ],
  exports: [
    ListValorationsComponent
  ]
})
export class ValorationsModule { }
