import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { User } from '../core/models/user.model';
import { UserService } from '../core/services/user.service';
import { GraphQLService } from '../graphql.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!:User
  bars = []
  constructor(
    private apollo: Apollo,
    private graphQLService: GraphQLService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(data => {
      this.user = data;
    })
    this.getBars()
  }
  getBars() {
    this.graphQLService.getBars().subscribe((data) => {
      this.bars = data.data.bars
    })
  }
  addBar(nom: String,descr: String,direcc: String, city: String, coords: String, horari: String, foto: String) {
    this.graphQLService.addBar(nom,descr,direcc,city,coords,horari,foto).subscribe((data) => {
      console.log(data);
      console.log(data.data.addBar);
    });
  }

}
