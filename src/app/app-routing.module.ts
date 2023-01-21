// Title: nodebucket
// Author: Professor Krasso
// Date: 13 Jan 2023
// Modified by: Kayla McDanel
// Attributions: Code from Bellevue Web Dev GitHub Repository
// https://github.com/buwebdev/web-450

//Dedicated routes to navigate application

import { LoginComponent } from './pages/login/login.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from "./shared/base-layout/base-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuard } from './auth.guard';
import { ContactComponent } from './pages/contact/contact.component';


const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'contact',
        component: ContactComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  //session routes
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
