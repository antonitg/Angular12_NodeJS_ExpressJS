import { Component, OnInit } from '@angular/core';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor (
    private userService: UserService
  ) {}

  ngOnInit() {
    // console.log("aaaaaaaaa");
    this.userService.populate();

    this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        console.log(isAuthenticated);
        console.log("OOOOOOOOOOOOOOOOO");


  });
}


  title = 'APPBAR';
}
