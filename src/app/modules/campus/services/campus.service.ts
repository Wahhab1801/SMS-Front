import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import Campus from '../models/campus.model';
import { AppConstants } from '../../../app.constants';

@Injectable({
  providedIn: 'root',
})
export class CampusService {
  constructor(private httpClient: HttpClient) {}

  getAll(query?: any): Observable<Campus[]> {
    const queryParams = [];
    query && query.name && queryParams.push(`name=${query.name}`);
    const requestUrl = `${AppConstants.API_URL}campuses?${queryParams.join('&')}`;
    return this.httpClient.get<Campus[]>(requestUrl).pipe(
      map((response) => {
        return response;
      }),
    );
  }
}
