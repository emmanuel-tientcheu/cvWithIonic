import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private auth:Auth) {}

    async  register({email,password}) { //it will create a user into our firebase
      // createUserWithEmailAndPassword(this.auth,email,password)
      try{
        const user=await createUserWithEmailAndPassword(
          this.auth,
          email,
          password);
          return user //if user is created it will return a user else the catch will be implemented
      }catch(e){
        return null;
      }
    }

    async login({email,password}) {
      try{
        const user=await signInWithEmailAndPassword(
          this.auth,
          email,
          password);
          return user //if user is created it will return a user else the catch will be implemented
      }catch(e){
        return null;
      }
    }

    logout(){
      return signOut(this.auth)
    }
  
}




