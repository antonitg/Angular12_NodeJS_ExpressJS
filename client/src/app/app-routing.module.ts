import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { AuthComponent } from './auth/auth.component';
import { BarComponent } from './bar/bar.component';
import { AuthGuard } from './core/services/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'app/profile',
    component: ProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'app/auth',
    component: AuthComponent
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
