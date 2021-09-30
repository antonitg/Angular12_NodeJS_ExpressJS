import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { BarComponent } from "./bar.component";

const routes: Routes = [
  {
    path: ':slugbar',
    component: BarComponent,
    // resolve: {
    //   profile: ProfileResolver
    // },
    children: [
      {
        path: '',
        component: BarComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarRoutingModule { }
