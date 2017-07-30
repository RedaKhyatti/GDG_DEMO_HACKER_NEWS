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
    this.authService.user.subscribe((user)=>{
      if(user && user.uid){
        this.user = user;
        this.router.navigate(['/posts']);
      } 
    });
  }

  signup() {
    this.router.navigate(['signup']);
  }

  login() {
    this.loginForm.controls['email'].enable();
    this.loginForm.controls['password'].enable();
    this.authService.login(this.loginForm.controls['email'].value,this.loginForm.controls['password'].value)
    .then(function(response){
      //User has just logedIn
      //this.router.navigate(['/posts']);
    })      
    .catch(function(error){
      this.loginForm.controls['email'].disable();
      this.loginForm.controls['password'].disable();
      this.loginError = error.message;
    })
  }

  logout() {
    this.authService.logout();
  }

  onGoogleLogin(){
    this.authService.loginGoogle().then((response)=>{
      this.authService.isUserSaved().subscribe((obj)=>  {
	      	if(obj.length === 0){
	        	this.authService.saveGoogleUser();
	      	}
	    });
    })
  }

}
