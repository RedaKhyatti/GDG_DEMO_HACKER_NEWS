import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  user;

  constructor(private authService:AuthService){}

  ngOnInit(){
    this.authService.user.subscribe((user)=>{
      this.user = user;
    })
  }

  logout(){
    console.log('login out');
    this.authService.logout().then((obj)=>{
      console.log(obj);
    })
  }
}
