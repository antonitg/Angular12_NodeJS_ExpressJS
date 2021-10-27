import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './shared/product/product.component';
import { HomeModule } from './home/home.module'
import { ProductModule } from './shared/product/product.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { BarModule } from './bar/bar.module';
import { ValorationsModule } from './shared/valorations/valorations.module';
import { LayoutComponent } from './shared/layout/layout.component';
import { ShowAuthedDirective } from './shared/layout/show-authed.directive';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ProfileModule } from './profile/profile.module';



@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HomeComponent,
    LayoutComponent,
    ShowAuthedDirective,

  ],
  imports: [
    ValorationsModule,
    BarModule,
    HomeModule,
    ProductModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    ProfileModule,
    AuthModule,
    CoreModule
  ],
  exports: [
    ShowAuthedDirective
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
