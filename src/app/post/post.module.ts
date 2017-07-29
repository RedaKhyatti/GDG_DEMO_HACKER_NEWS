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
import { MomentModule } from 'angular2-moment'

import { AuthService } from  '../auth/auth.service';
import { PostService } from './post.service';

import { PostListComponent } from './post-list.component';
import { PostFormComponent } from './post-form.component';
import { PostComponent } from './post.component';

export const routes = [
  {path:'',component:PostListComponent}
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
    MdMenuModule,
    MomentModule
  ],
  declarations: [
    PostListComponent, 
    PostFormComponent, 
    PostComponent
  ],
  providers: [
    PostService,
    AuthService
  ]
})
export class PostModule { }
