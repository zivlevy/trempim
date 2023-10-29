import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthService} from "../services/auth.service";
import  firebase from "firebase/compat/app";
import {getAuth, RecaptchaVerifier} from "@angular/fire/auth";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  phoneNumber: string = ''
  confirmationResult: any = null
  constructor(private afAuth: AngularFireAuth,
              private auth: AuthService) {
    firebase.initializeApp({"projectId":"report-il","appId":"1:425779901846:web:80d3b1de65a2cc106a59b7","storageBucket":"report-il.appspot.com","apiKey":"AIzaSyCaww1rMvWzPxC9bTMKMXus8EOTRFPlBiI","authDomain":"report-il.firebaseapp.com","messagingSenderId":"425779901846"})
  }

  authPhone(phoneNo: string) {
    const auth = getAuth();
    // var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    // firebase.initializeApp({"projectId":"report-il","appId":"1:425779901846:web:80d3b1de65a2cc106a59b7","storageBucket":"report-il.appspot.com","apiKey":"AIzaSyCaww1rMvWzPxC9bTMKMXus8EOTRFPlBiI","authDomain":"report-il.firebaseapp.com","messagingSenderId":"425779901846"})
    this.afAuth.signInWithPhoneNumber(phoneNo, new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response : any) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log(response)
      }
    })).then((confirmationResult) => {
      this.confirmationResult = confirmationResult

      console.log(confirmationResult)
    })
    // this.afAuth.signInWithEmailAndPassword('zivilevy@gmail.com', '123456')
  }

  isPhoneLegal(phoneNo: string) {
    return this.auth.isPhoneLegal(phoneNo)
  }

  sendVerificationCode(verificationCode: string) {
    this.confirmationResult.confirm(verificationCode).then((result: any) => {
      // User signed in successfully.
      const user = result.user;
      this.confirmationResult = null
      // ...
    }).catch((error: any) => {
      console.log(error)
    })
  }
}
