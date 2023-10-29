import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private router: Router,
              private afAuth: AngularFireAuth,) {
this.initListenter()
  }

  initListenter() {
    this.afAuth.authState
      .subscribe(user => {
        if (user) {
          console.log(user)
          this.user$.next(user);
          this.router.navigate(['/tabs'])

        } else {
          this.user$.next(null)
          this.router.navigate(['/login']);
        }
      });

  }

  signOut() {

    this.afAuth.signOut().then(() => {
      this.user$.next(null)
      this.router.navigate(['/login']);
    });
  }

  currentUser() {
    return this.afAuth.currentUser;
  }

  getCurrentUser$() {
    return this.user$.asObservable();
  }

  isPhoneLegal(phoneNo: string) {
    if (phoneNo === undefined || phoneNo === null) {
      return false;
    }
    const regex = /^(0(5[0-689]|7[2346789])(?![01])(\d{7}))$/;
    const tel = phoneNo.replace('-', '');
    return tel.match(regex) !== null;
  }
}
