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
import { BarComponent } from './bar/bar.component';
import { BarModule } from './bar/bar.module';





@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HomeComponent,
    // BarComponent

  ],
  imports: [
    BarModule,
    HomeModule,
    ProductModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
