import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: ':bar_opt',
    loadChildren: () => import('./bar/bar.module').then(m => m.BarModule)
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
