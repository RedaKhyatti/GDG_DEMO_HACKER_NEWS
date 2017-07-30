import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;
  loginError;
  constructor(private authService:AuthService, private fb:FormBuilder, private router:Router) {
    this.signupForm = fb.group({
      'displayName':['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(120)])],
      'email':['',Validators.compose([Validators.required,Validators.email])],
      'password':['',Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16)
      ])]
    });
  }

  ngOnInit() {
    
  }

  signup() {
    this.signupForm.controls['email'].enable();
    this.signupForm.controls['password'].enable();
    this.authService.signup(this.signupForm.controls['email'].value,this.signupForm.controls['password'].value)
    .then((response)=>{
      console.log(response);
      this.authService.isUserSaved().subscribe((obj)=>  {
        if(obj.length === 0){
          this.authService.saveCustomUser(this.signupForm.controls['displayName'].value);
        }
      });
    })
    .catch((error)=>{
      this.loginError = error.message;
      this.signupForm.controls['email'].disable();
      this.signupForm.controls['password'].disable();
      console.log('Error signing in ', error);
    })
  }

  back(){
    this.router.navigate(['/']);
  }

}
