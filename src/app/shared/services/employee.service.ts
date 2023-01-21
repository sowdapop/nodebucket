// Title: nodebucket
// Author: Professor Krasso
// Date: 13 Jan 2023
// Modified by: Kayla McDanel
// Attributions: Code from Bellevue Web Dev GitHub Repository
// https://github.com/buwebdev/web-450

//Service acts as file to make calls to api layer

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  findEmployeeById(empId: number): Observable<any> {
    //path to server code
    return this.http.get('/api/employees/' + empId);
  }
}
