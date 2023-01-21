// Title: nodebucket
// Author: Professor Krasso
// Date: 13 Jan 2023
// Modified by: Kayla McDanel
// Attributions: Code from Bellevue Web Dev GitHub Repository
// https://github.com/buwebdev/web-450

//imported modules
import { Employee } from './../../shared/models/employee.interface';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { Message } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Define error message & employee variables
  errorMessages: Message[] = [];
  employee: Employee;
  
  //Login form requirements
  loginForm: FormGroup = this.fb.group ({
    empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
  })

//Establishes form services
  constructor(private fb: FormBuilder, private router: Router, private cookieService: CookieService, private http: HttpClient,
    private employeeService: EmployeeService) { 
      this.employee = {} as Employee;
    }

  ngOnInit(): void {
  }

  //Login function which validates the input from user
  login() {
    const empId = this.loginForm.controls['empId'].value;

    this.employeeService.findEmployeeById(empId).subscribe({
      next: (res) => {
        if (res) {
          this.employee = res;
          this.cookieService.set('session_user', this.employee.empId.toString(), 1);
          this.cookieService.set('session_name', `${this.employee.firstName} ${this.employee.lastName}`, 1);
          this.router.navigate(['/'])
        } else {
          this.errorMessages = [
          { severity: 'error', summary: 'Error', detail: 'Please enter a valid Employee ID to continue.' }
        ]
        }
      },
      error: (e) => {
        console.log(e);
        this.errorMessages = [
          { severity: 'error', summary: 'Error', detail: e.message }
        ]
      }
    })
  }
}
