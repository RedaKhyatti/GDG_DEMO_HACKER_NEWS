import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from './post.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['../app.component.css']
})
export class PostListComponent implements OnInit {

  posts:any[]=[];
  user;
  constructor(private postService:PostService, private authService:AuthService, private router:Router) { 

  }

  ngOnInit() {
    this.authService.user.subscribe((user)=>{
      console.log(user);
      if(user){
        this.user = user;
        this.postService.getPosts().subscribe((posts)=>{
          this.posts = [];
          posts.forEach((post)=>{
            this.authService.getUserByUid(post.sender).subscribe((sender)=>{
              this.posts.push({'post':post,'sender':sender[0]});
              this.posts.sort((a,b)=> {return b.post.createdDate - a.post.createdDate});
            });
          });

        });
      }
      else{
        this.router.navigate(['/']);
      }
    });
  }

  getUserByUid(uid:string){
    return this.authService.getUserByUid(uid);
  }

}
