import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  showGeneralNav = true;
  currentUser!: User;
  constructor(private router: Router, private userService: UserService) {}
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((furl) => {
        const algo = furl as RouterEvent;
        algo.url == '/app/auth'
          ? (this.showGeneralNav = false)
          : (this.showGeneralNav = true);
      });
    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;
    });
  }
  logout() {
    this.userService.purgeAuth();
  }
}
