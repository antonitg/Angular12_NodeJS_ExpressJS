import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListValorationsComponent } from './list-valorations/list-valorations.component';
import { List, Star, Trash2, Edit } from 'lucide-angular';
import { ValorationsService } from 'src/app/core';
import { LucideAngularModule } from 'lucide-angular';
import { CreateValorationComponent } from './create-valoration/create-valoration.component';




@NgModule({
  declarations: [
    ListValorationsComponent,
    CreateValorationComponent
  ],
  imports: [
    CommonModule,
    // CreateValorationComponent,
    LucideAngularModule.pick({
      Star,
      Trash2,
      Edit
    })
  ],
  exports: [
    ListValorationsComponent
  ]
})
export class ValorationsModule { }
