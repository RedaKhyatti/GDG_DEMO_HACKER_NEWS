import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  user;
  constructor(private authService:AuthService){

  }

  ngOnInit(){
    let self = this;
    this.authService.user.subscribe(function(user){
      if(user){        
        self.user = user;
      }
    });
  }

  logout(){
    this.authService.logout();
  }
}
