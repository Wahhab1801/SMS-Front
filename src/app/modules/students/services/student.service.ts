import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import Student from '../models/student.model';
import { AppConstants } from '../../../app.constants';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private httpClient: HttpClient) {}

  getAll(query?: any): Observable<Student[]> {
    const queryParams = [];
    query.name && queryParams.push(`name=${query.name}`);
    const requestUrl = `${AppConstants.API_URL}students?${queryParams.join('&')}`;
    return this.httpClient.get<Student[]>(requestUrl).pipe(
      map((response) => {
        return response;
      }),
    );
  }
  delete(id: string): Observable<Student> {
    const requestUrl = `${AppConstants.API_URL}classes/${id}`;
    return this.httpClient.delete<Student>(requestUrl).pipe(
      map((response) => {
        return response;
      }),
    );
  }
}
