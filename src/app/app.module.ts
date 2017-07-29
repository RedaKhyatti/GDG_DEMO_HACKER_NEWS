import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule, 
  MdCardModule, 
  MdIconModule, 
  MdInputContainer,
  MdInputModule, 
  MdMenuModule,
  MdToolbarModule
} from "@angular/material";

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';


export const firebaseConfig={
    apiKey: "AIzaSyCBJd3BjzYnEh4j7xY5wQegpbmHLuTT_6w",
    authDomain: "chat-firebase-5e261.firebaseapp.com",
    databaseURL: "https://chat-firebase-5e261.firebaseio.com",
    projectId: "chat-firebase-5e261",
    storageBucket: "",
    messagingSenderId: "417010905060"
}
  
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MdButtonModule,
    MdToolbarModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    AuthModule
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
