import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BarService {
  constructor (
    private apiService: ApiService
  ) {}

  getAll(): Observable<[string]> {
          return this.apiService.get('products/categories/id1')
  }

}