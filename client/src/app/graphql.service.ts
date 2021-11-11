import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
      const getYourHobbys = gql`
      query getYourHobbys{
        getYourHobbys{
            _id,
            nom,
            descr
        }
      }
      `;
    const deleteHobby = gql`
    query deleteHobby($input: idInput){
      deleteHobby(idInput: $input){
          ok
      }
  }`;
const newHobby = gql`
mutation newHobby($input: newHobbyInput){
  newHobby(newHobby: $input){
      _id,
      nom,
      descr
    }
}`;
const updateHobby = gql`
mutation updateHobby($idInput: idInput, $input: newHobbyInput){
  updateHobby(idInput: $idInput, newHobby: $input){
      _id,
      nom,
      descr
  }
}`;

@Injectable({
  providedIn: 'root'
})
export class GraphQLService {
  constructor(private apollo: Apollo) { }
  getYourHobbys(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: getYourHobbys
    }).valueChanges;
  }
  deleteHobby(input: any): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: deleteHobby,
      variables: {
        input: input
      },
    }).valueChanges;
  }
  newHobby(input: any): Observable<any> {
    return this.apollo.mutate({
      mutation: newHobby,
      variables: {
        input: input
      },
    });
  }
  updateHobby(input: any, idInput:any): Observable<any> {
    return this.apollo.mutate({
      mutation: updateHobby,
      variables: {
        input: input,
        idInput: idInput
      },
    });
  }
}
