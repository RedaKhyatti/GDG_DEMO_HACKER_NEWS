import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';

import { PostService } from './post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['../app.component.css']
})
export class PostFormComponent implements OnInit {

  postForm:FormGroup;
  constructor(private fb:FormBuilder, private postService:PostService) { 
    this.postForm = fb.group({
      message:fb.control('',Validators.compose([Validators.required,Validators.minLength(6)]))
    });
  }

  ngOnInit() {

  }

  publish(){
    this.postForm.controls['message'].disable();
    this.postService.publishPost(this.postForm.controls['message'].value)
    .then(()=>{
      this.postForm.controls['message'].setValue('');
      this.postForm.controls['message'].enable();
      this.postForm.markAsPristine();
      this.postForm.markAsUntouched();
      this.postForm.updateValueAndValidity();
    });
  }

}
