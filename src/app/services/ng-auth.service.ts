import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

export interface User
{
  uid: string;
  email: string;
  name: string;
  tel: string[];
  ville: string;

    aboutme: string;

    loisir: string[];

    lang_spoken: string[],

    cursus: {
              titre : string;
              ecole : string;
              periode : string;
            }[],

    experience: string[],

    competences :
                  {
                    title :string,
                    percentage :number,
                  }[],

}


@Injectable({
  providedIn: 'root',
})

export class NgAuthService {
  userState: any;
  docref: any;
  userdata: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    /*this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });*/
  }

  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(async (result) => {
          console.log(result.user.uid);
          this.getUserData(result.user.uid);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignUp(email, password) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password).then((result) => {
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  SetUserData(user) {
    this.afs.collection('users').doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      name: "AMBASSIRA AMBASSIRA RYAN CRAIG",
      tel: ["+237 658171712"],
      ville: " Nkolbisson yaoundé",

      aboutme:"I am a talented ambitious and hardworking individual with broad skills and experience in digital and printed marketing social media and leading projects Furthermore I am adept at handling multiple tasks on a daily basis competently and at working well under pressure A key strength is communication; building strong relationships with people in order to deliver the best results Recently I completed an Open degree, including Business and Design modules at the Open University and I am now fully employed by Clearly Presented as a Digital Media Manager",

      loisir:
          [
            "football",
            "basketball",
          ],

      lang_spoken:
         [
            "english",
            "french",
         ],

      cursus:
        [
          {
            titre: "LICENCE 2 ICT4D",
            ecole: "universite de yaounde 1",
            periode: "2020-present"
          },

          {
            titre: "GCE Advanced Level/ GCE Ordinary Level",
            ecole: "saint benedict catholic college",
            periode: "2013-2020"
          },

          {
            titre: "First School Leaving Certificate",
            ecole: "Holy Infant School Melen",
            periode: "2004-2013"
          },
        ],

        experience:
         [
            "2 months internship at orange cameroon",
            "3 months internship at Tagus drone Yaounde",
         ],


        competences:
         [
            {
                title:"Web Development",
                percentage:90,
            },

            {
                title:"Object Oriented Programming",
                percentage:80,
            },

            {
                title:"Creativity",
                percentage:70,
            },
         ],
    }).then(
      res => {
        console.log(res);
        //this.form.reset();
        alert("signup successful")

        /****************getting user data*********************/
        this.docref = this.afs.collection('users', ref => ref.where('uid', '==', user.uid));
        this.docref.get().subscribe(users =>{
          if (users.docs.length === 0) {
            alert('User data not found! Try again!');
             this.userdata = null;
           } else {
             users.docs.forEach(doc => {
               this.userdata = doc.data();
               this.setdatatolocalstorage(this.userdata)
               this.router.navigate(['./home']);
             })
           }
        })
        /************************************************* */
    })
    .catch(e => {
        console.log(e);
    })
  }

  getUserData(userid)
  {
      this.docref = this.afs.collection('users', ref => ref.where('uid', '==', userid));
      this.docref.get().subscribe(users =>{
        if (users.docs.length === 0) {
          alert('User data not found! Try again!');
           this.userdata = null;
         } else {
           users.docs.forEach(doc => {
             alert('LOGIN SUCCESSFULL');
             this.userdata = doc.data();
             this.setdatatolocalstorage(this.userdata)
             this.router.navigate(['./home']);
           })
         }
      })
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

  setdatatolocalstorage(userd)
  {
    localStorage.setItem('user', JSON.stringify(userd));
    const userobj =  JSON.parse(localStorage.getItem('user'));
    return userobj;
  }
}
