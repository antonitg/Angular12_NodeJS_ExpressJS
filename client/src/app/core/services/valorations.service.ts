import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Categorie } from '../models/categories.model';
import { Valoration } from '../models/valorations.model';

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
  updateValoration(valoration:Valoration): Observable<any> {
    return this.apiService.put('bar/valorations/'+valoration._id,{
      rate:valoration.rate,
      descr:valoration.descr
    })
  }
  createBarValoration(id_bar: string, stars: number, valoration: string): Observable<any> {
    return this.apiService.post('bar/valorations/', {
      id_bar:id_bar,
      rate:stars,
      descr:valoration
    })

  }
}
