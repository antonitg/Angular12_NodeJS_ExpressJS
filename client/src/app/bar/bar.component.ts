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

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.slug_bar = params['slugbar'];
      this.page = params['bar_opt']

      this.printInfo()

    })

}
getCategos() {
  this.BarService.getAllFrom(this.bar.id).subscribe(cats => {
    this.categos = cats;
    console.log(cats)
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
