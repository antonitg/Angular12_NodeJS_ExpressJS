import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
console.log("kkkkkk");
@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  // styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) {}
  slug_bar!:String;

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.slug_bar = params['slugbar'];
    })
}
  printInfo() {
    
  }
}
