import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarService } from '../core';
import { Bar } from '../core/models/bar.models'
@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  // styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private BarService : BarService
  ) {}
  slug_bar!:string;
  page!:string;
  bar!:Bar;
  categos!:any;
  actCatego!:any;
  prodList!:any;
  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.slug_bar = params['slugbar'];
      this.page = params['bar_opt']
      this.printInfo()
    })
}
changeCatego(id_catego:any) {
  this.actCatego = id_catego;
  this.getProds()
}
getCategos() {
  this.BarService.getAllFrom(this.bar.id).subscribe(cats => {
    this.categos = cats;
    this.actCatego = cats[0];
    this.getProds()
  })
}
getProds() {
  this.BarService.getProdByCatego(this.actCatego._id).subscribe(prods => {
    this.prodList = prods
    console.log(prods)
  })
}
  printInfo() {
    this.BarService.getBarInfo(this.slug_bar).subscribe(infoBar => {
      console.log(infoBar)
      this.bar = infoBar;
      console.log(this.bar);
      this.getCategos()
    })
  }
}
