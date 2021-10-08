import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  showGeneralNav = true
  constructor(
    private router: Router
      ) { }
  ngOnInit(): void {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(furl => {
      const algo = furl as RouterEvent
      algo.url == '/app/auth' ?  this.showGeneralNav = false: this.showGeneralNav = true
    });


    // })
    // console.log(this.ar.params);
  }


}
