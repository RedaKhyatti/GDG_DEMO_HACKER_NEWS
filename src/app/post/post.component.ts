import { Component, OnInit, Input } from '@angular/core';

import { PostService } from './post.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styles: []
})
export class PostComponent implements OnInit {

  @Input() post;
  likes:any[];

  hasUserLikes:boolean;
  
  constructor(private postService:PostService) { 

  }

  ngOnInit() {
    this.postService.hasUserLikedPost(this.post.post.$key).subscribe((likes)=>{
      if(likes && likes.length == 1){
        this.hasUserLikes = true;
      }
    });
    this.postService.getPostLikes(this.post.post.$key).subscribe((likes)=>{
      this.likes = likes;
    })
  }

  like(){
    this.postService.likePost(this.post.post.$key);
  }

  unlike(){
    this.postService.unlikePost(this.post.post.$key);
  }

}
