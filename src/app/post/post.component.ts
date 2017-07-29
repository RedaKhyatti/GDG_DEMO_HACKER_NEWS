import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from './post.service';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styles: []
})
export class PostComponent implements OnInit {

  @Input() post;
  likes:any[];
  comments: any[];
  commentForm:FormGroup;
  isUserPost:boolean;
  hasUserLikes:boolean;
  user;
  
  constructor(private postService:PostService, private fb:FormBuilder, private authService:AuthService) { 
    this.commentForm = fb.group({
      message: fb.control('',Validators.compose([Validators.required, Validators.minLength(1)]))
    })
  }

  ngOnInit() {
    this.authService.user.subscribe((user)=>{
      this.user = user;
      console.log(this.post.sender);
      if(user.uid != this.post.sender.uid){
        this.isUserPost = false;
      }
      else{
        this.isUserPost = true;
      }
    });

    this.postService.hasUserLikedPost(this.post.post.$key).subscribe((likes)=>{
      if(likes && likes.length == 1){
        this.hasUserLikes = true;
      }
    });
    this.postService.getPostLikes(this.post.post.$key).subscribe((likes)=>{
      this.likes = likes;
    });
    this.postService.getComments(this.post.post.$key).subscribe((comments)=>{
      if(comments){
        comments.forEach((comment)=>{
          comment.sender = this.authService.getUserByUid(comment.sender);
        });
        this.comments = comments.reverse();
      }
    });
  }

  like(){
    this.postService.likePost(this.post.post.$key);
  }

  unlike(){
    this.postService.unlikePost(this.post.post.$key);
  }

  addComment(){
    this.postService.addComment(this.post.post.$key, this.commentForm.controls['message'].value);
    this.commentForm.controls['message'].setValue('');
  }

  deletePost(){
    this.postService.deletePost(this.post.post.$key);
  }

  deleteComment(commentKey:string) {
    this.postService.deleteComment(this.post.post.$key,commentKey);
  }

}
