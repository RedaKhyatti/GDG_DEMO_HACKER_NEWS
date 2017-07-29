import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;

  constructor(private authService:AuthService, private fb:FormBuilder) {
    this.signupForm = fb.group({
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
    this.authService.signup('','');    
  }

}
