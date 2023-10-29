import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import {IonicModule, IonicRouteStrategy, mdTransitionAnimation} from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MyTrempModalComponent} from "./components/my-tremp-modal/my-tremp-modal.component";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import {AngularFireModule} from "@angular/fire/compat";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatModule} from "./mat/mat.module";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import { ServiceWorkerModule } from '@angular/service-worker';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YY',
  },
  display: {
    dateInput: 'DD/MM/YY',
    monthYearLabel: 'MM/YY',
    dateA11yLabel: 'DD/MM/YY',
    monthYearA11yLabel: 'MM/YY',
  },
};
@NgModule({
  declarations: [AppComponent,
  MyTrempModalComponent],
  imports: [BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatModule,
    IonicModule.forRoot({navAnimation: mdTransitionAnimation, mode: 'ios'}),
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"report-il","appId":"1:425779901846:web:80d3b1de65a2cc106a59b7","storageBucket":"report-il.appspot.com","apiKey":"AIzaSyCaww1rMvWzPxC9bTMKMXus8EOTRFPlBiI","authDomain":"report-il.firebaseapp.com","messagingSenderId":"425779901846"})),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    AngularFireModule.initializeApp({
      "projectId": "report-il",
      "appId": "1:425779901846:web:80d3b1de65a2cc106a59b7",
      "storageBucket": "report-il.appspot.com",
      "apiKey": "AIzaSyCaww1rMvWzPxC9bTMKMXus8EOTRFPlBiI",
      "authDomain": "report-il.firebaseapp.com",
      "messagingSenderId": "425779901846"
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ScreenTrackingService, UserTrackingService,
    {provide: MAT_DATE_LOCALE, useValue: 'he-IL'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},],
  bootstrap: [AppComponent],
})
export class AppModule {}
