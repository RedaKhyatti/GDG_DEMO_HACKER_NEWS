import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent implements OnInit {

  user;
  loginForm:FormGroup;
  loginError;

  constructor(private authService:AuthService, private fb:FormBuilder, private router:Router) {
    this.loginForm = fb.group({
      'email':['',Validators.compose([Validators.required,Validators.email])],
      'password':['',Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16)
      ])]
    });
  }

  ngOnInit() {
    let self = this;
    this.authService.user.subscribe(function(user){
      if(user && user.uid){
        self.user = user;
        self.router.navigate(['/posts']);
      } 
    });
  }

  signup() {
    this.router.navigate(['authenticate/signup']);
  }

  login() {
    let self = this;
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.controls['email'].value,this.loginForm.controls['password'].value)
      .then(function(response){
        //User has just lo

      })      
      .catch(function(error){
        self.loginError = error.message;
      })
    }
  }

  logout() {
    this.authService.logout();
  }

  onGoogleLogin(){
    let self = this;
    this.authService.loginGoogle().then(function(response){
      self.authService.isUserSaved().subscribe((obj)=>  {
	      	if(obj.length === 0){
	        	self.authService.saveNewUser();
	      	}
	    });
    })
  }

}
