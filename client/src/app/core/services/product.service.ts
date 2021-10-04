import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Categorie } from '../models/categories.model';
import { Bar } from '../models/bar.models'

@Injectable({
  providedIn: 'root'
})
export class BarService {
  constructor (
    private apiService: ApiService
  ) {}

  getAllCategories(): Observable<[Categorie]> {
    return this.apiService.get('bar/categories/100');
  }
}
