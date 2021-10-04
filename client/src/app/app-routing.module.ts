import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  {
    path: 'product',
    loadChildren: () => import('./shared/product/product.module').then(m => m.ProductModule)
  },
  {
    path: ':bar_opt',
    loadChildren: () => import('./bar/bar.module').then(m => m.BarModule)
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: QuicklinkStrategy,
      relativeLinkResolution: 'legacy'
    })

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
