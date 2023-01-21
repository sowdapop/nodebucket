import { Employee } from './../models/employee.interface';
// Title: nodebucket
// Author: Professor Krasso
// Date: 13 Jan 2023
// Modified by: Kayla McDanel
// Attributions: Code from Bellevue Web Dev GitHub Repository
// https://github.com/buwebdev/web-450


import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  //Uses the current date in footer
  year: number = Date.now();

  //Service implementation for logout function
  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  //Log out function
  logout() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/login']);
  }
}
