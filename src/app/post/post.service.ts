import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase';

@Injectable()
export class PostService {

  user;
  constructor(private db:AngularFireDatabase, private authService:AuthService) { 
    this.authService.user.subscribe((user)=>{
      this.user = user;
    })
  }

  getPosts(){
    return this.db.list('/posts');
  }

  getPost(postKey:string){
    return this.db.object('/posts/'+postKey);
  }

  deletePost(postKey:string){
    this.db.object('/posts/'+postKey).remove();
  }
  
  publishPost(message:string){
    this.authService.user.subscribe((user)=>{
      if(user){
        let post = {'message':message,'sender':user.uid,'createdDate':firebase.database['ServerValue']['TIMESTAMP']}
        this.db.list('posts').push(post);
      }
    });
  }

  hasUserLikedPost(postKey:string){
    return this.db.list('/posts/'+postKey+'/likes',{query:{orderByChild:'sender',equalTo:this.user.uid}})
  }
  
  likePost(postKey:string){
    var subscription = this.db.list('/posts/'+postKey+'/likes',{query:{orderByChild:'sender',equalTo:this.user.uid}})
      .subscribe((userLiked)=>{
        console.log(userLiked);
        if(!userLiked || userLiked.length == 0){
          this.db.list('/posts/'+postKey+'/likes').push({'sender':this.user.uid,'createdDate':firebase.database['ServerValue']['TIMESTAMP']});
          subscription.unsubscribe();
        }
      });
  }


  unlikePost(postKey:string){
    var subscription = this.db.list('/posts/'+postKey+'/likes',{query:{orderByChild:'sender',equalTo:this.user.uid}})
    .subscribe((userLiked)=>{
      if(userLiked.length > 0 ){
        console.log(userLiked[0].$key);
        this.db.object('/posts/'+postKey+'/likes/'+userLiked[0].$key).remove();
        subscription.unsubscribe();
      }
    });
  }    
  
  getPostLikes(postKey:string){
    return this.db.list('/posts/'+postKey+'/likes');
  }

  addComment(postKey:string,message:string){
    let comment = {'message':message,'createdDate':firebase.database['ServerValue']['TIMESTAMP'],'sender':this.user.uid};
    console.log(comment);
    this.db.list('/posts/'+postKey+'/comments').push(comment);
  }

  getComments(postKey:string){
    return this.db.list('/posts/'+postKey+'/comments');
  }


  deleteComment(postKey:string , commentKey:string){
    return this.db.object('/posts/'+postKey+"/comments/"+commentKey).remove();
  }
}
