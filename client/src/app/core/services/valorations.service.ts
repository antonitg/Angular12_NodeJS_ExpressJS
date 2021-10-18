import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Categorie } from '../models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class ValorationsService {
  constructor (
    private apiService: ApiService
  ) {}
  getBarValorations(id_bar: string): Observable<any> {
    return this.apiService.get('bar/valorations/'+id_bar+"/10")
  }
  createBarValoration(id_bar: string, stars: number, valoration: string): Observable<any> {
    return this.apiService.post('bar/valorations/', {
      id_bar:id_bar,
      rate:stars,
      descr:valoration
    })

  }
}
