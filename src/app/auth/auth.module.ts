import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MdButtonModule, 
  MdCardModule, 
  MdIconModule, 
  MdInputContainer,
  MdInputModule, 
  MdMenuModule,
  MdToolbarModule
} from "@angular/material";

import { AuthService } from  './auth.service';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';

export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MdButtonModule,
    MdToolbarModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
