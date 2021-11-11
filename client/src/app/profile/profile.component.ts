import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { User } from '../core/models/user.model';
import { Hobby } from '../core/models/hobby.model';
import { UserService } from '../core/services/user.service';
import { GraphQLService } from '../graphql.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']

})
export class ProfileComponent implements OnInit {
  user!:User
  hobbies!: [Hobby]
  input = {}
  idInput = {}
  updatingHobbyId! : String
  @ViewChild ('inNom') inNom!: ElementRef
  @ViewChild ('inDescr') inDescr!: ElementRef

  @ViewChild ('upNom') upNom!: ElementRef
  @ViewChild ('upDescr') upDescr!: ElementRef

  constructor(
    private apollo: Apollo,
    private graphQLService: GraphQLService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(data => {
      this.user = data;
    })

    this.getYourHobbys()
  }
  modalUpdateHobby(hobby: any) {
    this.updatingHobbyId = hobby._id
    this.upNom.nativeElement.value = hobby.nom
    this.upDescr.nativeElement.value = hobby.descr

  }
  updateHobby() {

    this.input = {
      nom:this.upNom.nativeElement.value,
      descr:this.upDescr.nativeElement.value
    }
    this.graphQLService.updateHobby(this.input, {
      id:this.updatingHobbyId
    }).subscribe(data => {
      console.log(data);
      this.getYourHobbys()

    })
    // this.cd.markForCheck();

  }
  getYourHobbys() {
    this.graphQLService.getYourHobbys().subscribe((data) => {
      this.hobbies = data.data.getYourHobbys
      console.log(this.hobbies);

    })
  }
  deleteHobby(id:any) {
    this.input = {
      id: id
    }
    this.graphQLService.deleteHobby(this.input).subscribe( data => {
      console.log(data)
      this.getYourHobbys();
      this.graphQLService.getYourHobbys().subscribe((data) => {
        this.hobbies = data.data.getYourHobbys
        console.log(this.hobbies);

      })

    })


  }
  newHobby() {
    this.input = {
      nom:this.inNom.nativeElement.value,
      descr:this.inDescr.nativeElement.value
    }
    console.log(this.input);

    this.graphQLService.newHobby(this.input).subscribe((data) => {
      this.getYourHobbys()

    });
  }

}


