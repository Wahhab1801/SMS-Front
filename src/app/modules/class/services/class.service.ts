import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import Class from '../models/class.model';
import { AppConstants } from '../../../app.constants';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  constructor(private httpClient: HttpClient) {}

  getAllClasses(query?: any): Observable<Class[]> {
    const queryParams = [];
    query.name && queryParams.push(`name=${query.name}`);
    const requestUrl = `${AppConstants.API_URL}classes?${queryParams.join('&')}`;
    return this.httpClient.get<Class[]>(requestUrl).pipe(
      map((response) => {
        return response;
      }),
    );
  }
}
