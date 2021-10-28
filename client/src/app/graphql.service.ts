import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
const BARS = gql`
query getYourBars {
  Bar {
    id
    nom
    slug
    descr
    direcc
    city
    coords
    horari
    owner
    foto
  }
}
`
const ADD_BAR = gql`
  mutation newBar($nom: String!,$descr: String!,$direcc: String!, $city: String!, $coords: String!, $horari: String!, $foto: String!) {
    addBar(nom: $nom, descr: $descr, direcc: $direcc, city: $city, coords: $coords, horari: $horari, foto: $foto) {
     nom
     descr
     direcc
     city
     coords
     horari
     foto
   }
  }
`;
@Injectable({
  providedIn: 'root'
})
export class GraphQLService {
  constructor(private apollo: Apollo) { }
  getBars(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: BARS
    }).valueChanges;
  }
  addBar(nom: String,descr: String,direcc: String, city: String, coords: String, horari: String, foto: String): Observable<any> {
    return this.apollo.mutate({
      mutation: ADD_BAR,
      variables: {
        nom: nom,
        descr: descr,
        direcc: direcc,
        city: city,
        coords: coords,
        horari: horari,
        foto: foto
      },
    });
  }
}
