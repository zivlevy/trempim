import { Injectable } from '@angular/core';
import {Ride} from "../model/ride";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {BehaviorSubject} from "rxjs";
import * as moment from "moment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private myRides$: BehaviorSubject<Ride[]> = new BehaviorSubject<Ride[]>([])
  currentUser: any = null;
  constructor(private afs: AngularFirestore,
              private authService: AuthService) {
    this.authService.getCurrentUser$().subscribe(user => {
        if (user) {
          this.currentUser = user
            this.getMyRides(user)
        } else {
          this.currentUser = null
            this.myRides$.next([])
        }
    })
  }

  addRide(ride: Ride) {
    ride.updateAt =  moment().unix()
    ride.phone = this.currentUser.phoneNumber
    return this.afs.collection('rides').add(ride)
  }

private getMyRides(user: any) {
        this.afs.collection('rides', ref => ref.where('phone', '==', user.phoneNumber)).valueChanges()
            .subscribe((rides: any) => {
              this.myRides$.next(rides)
            })
}

getMyRides$() {
    return this.myRides$.asObservable()
}

  getZoneList() {
    return [
      {value: 'אצבע הגליל והגולן', viewValue: 'אצבע הגליל והגולן'},
      {value: 'גליל', viewValue: 'גליל'},
      {value: 'חיפה והקריות', viewValue: 'חיפה והקריות'},
      {value: 'עמקי צפון', viewValue: 'עמקי צפון'},
      {value: 'שרון', viewValue: 'שרון'},
      {value: 'שומרון', viewValue: 'שומרון'},
      {value: 'מרכז', viewValue: 'מרכז'},
      {value: 'חוף דרומי', viewValue: 'חוף דרומי'},
      {value: 'מבוא ירושלים', viewValue: 'מבוא ירושלים'},
      {value: 'נגב מערבי', viewValue: 'נגב מערבי'},
      {value: 'נגב מזרחי', viewValue: 'נגב מזרחי'},
      {value: 'נגב דרומי', viewValue: 'נגב דרומי'},
    ]
  }

  getHourList() {
    return [

      {value: '0', viewValue: '00:00'},
      {value: '30', viewValue: '00:30'},
      {value: '60', viewValue: '01:00'},
      {value: '90', viewValue: '01:30'},
      {value: '120', viewValue: '02:00'},
      {value: '150', viewValue: '02:30'},
      {value: '180', viewValue: '03:00'},
      {value: '210', viewValue: '03:30'},
      {value: '240', viewValue: '04:00'},
      {value: '270', viewValue: '04:30'},
      {value: '3000', viewValue: '05:00'},
      {value: '330', viewValue: '05:30'},
      {value: '360', viewValue: '06:00'},
      {value: '390', viewValue: '06:30'},
      {value: '420', viewValue: '07:00'},
      {value: '450', viewValue: '07:30'},
      {value: '480', viewValue: '08:00'},
      {value: '510', viewValue: '08:30'},
      {value: '540', viewValue: '09:00'},
      {value: '570', viewValue: '09:30'},
      {value: '600', viewValue: '10:00'},
      {value: '630', viewValue: '10:30'},
      {value: '660', viewValue: '11:00'},
      {value: '690', viewValue: '11:30'},
      {value: '720', viewValue: '12:00'},
      {value: '750', viewValue: '12:30'},
      {value: '780', viewValue: '13:00'},
      {value: '810', viewValue: '13:30'},
      {value: '840', viewValue: '14:00'},
      {value: '870', viewValue: '14:30'},
      {value: '900', viewValue: '15:00'},
      {value: '930', viewValue: '15:30'},
      {value: '960', viewValue: '16:00'},
      {value: '990', viewValue: '16:30'},
      {value: '1020', viewValue: '17:00'},
      {value: '1050', viewValue: '17:30'},
      {value: '1080', viewValue: '18:00'},
      {value: '1110', viewValue: '18:30'},
      {value: '1140', viewValue: '19:00'},
      {value: '1170', viewValue: '19:30'},
      {value: '1200', viewValue: '20:00'},
      {value: '1230', viewValue: '20:30'},
      {value: '1260', viewValue: '21:00'},
      {value: '1290', viewValue: '21:30'},
      {value: '1320', viewValue: '22:00'},
      {value: '1350', viewValue: '22:30'},
      {value: '1380', viewValue: '23:00'},
      {value: '1410', viewValue: '23:30'},

    ]
  }
}
