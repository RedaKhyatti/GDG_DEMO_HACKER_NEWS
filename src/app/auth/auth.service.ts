import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  
  user = new BehaviorSubject(null);
  
  constructor(private firebaseAuth: AngularFireAuth, private db: AngularFireDatabase, private router:Router) {
    firebaseAuth.authState.subscribe((user)=>{
      console.log(user);
      this.user.next(user);
    })
  }

  signup(email: string, password: string) {
    return this.firebaseAuth
            .auth
            .createUserWithEmailAndPassword(email, password)
  }

  login(email: string, password: string) {
    return this.firebaseAuth
            .auth
            .signInWithEmailAndPassword(email, password)
  }
  
  loginGoogle() {
    return this.firebaseAuth
            .auth
            .signInWithPopup(new firebase.auth.GoogleAuthProvider()
            .addScope('profile'))
  }

  logout() {
    console.log('sign out');
    return this.firebaseAuth
        .auth
        .signOut();
  }

  isUserSaved():FirebaseListObservable<any[]>{
		if(this.user){
			return this.db.list('/users',{query:{orderByChild: 'email',equalTo: this.firebaseAuth.auth.currentUser.email}});
		}
	}

	saveGoogleUser(){
    let user = {
      'uid':this.firebaseAuth.auth.currentUser.uid,
      'email':this.firebaseAuth.auth.currentUser.email,
      'dislayName':this.firebaseAuth.auth.currentUser.displayName,
      'photoUrl':this.firebaseAuth.auth.currentUser.photoURL,
      'phoneNumber':this.firebaseAuth.auth.currentUser.phoneNumber
    }
		return this.db.list('/users').push(user)
		  .catch(error => console.log('ERROR @ AuthService#saveNewUser() :', error));
  }

  saveCustomUser(displayName:string){
    let user = {
      'uid':this.firebaseAuth.auth.currentUser.uid,
      'email':this.firebaseAuth.auth.currentUser.email,
      'dislayName':displayName
    }
		return this.db.list('/users').push(user)
		  .catch(error => console.log('ERROR @ AuthService#saveNewUser() :', error));
  }
    
  getUserByUid(uid:string){
    return this.db.list('/users',{query:{orderByChild:'uid',equalTo: uid}});
  }

}
