import {Component, OnDestroy, OnInit} from '@angular/core';
import {InfiniteScrollCustomEvent, ModalController} from "@ionic/angular";
import {MyTrempModalComponent} from "../../components/my-tremp-modal/my-tremp-modal.component";
import {RideService} from "../../services/ride.service";
import {AuthService} from "../../services/auth.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-my-trempim',
  templateUrl: './my-trempim.page.html',
  styleUrls: ['./my-trempim.page.scss'],
})
export class MyTrempimPage implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private modalCtrl: ModalController,
              private authService: AuthService,
              private rideService: RideService) { }

  ngOnInit() {
    this.rideService.getMyRides$()
        .pipe(takeUntil(this.destroy$))
            .subscribe(rides => {
      console.log(rides)
    })
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: MyTrempModalComponent,
      componentProps: {

      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log( `Hello, ${data}!`);
      this.rideService.addRide(data)
    }
  }

  signOut() {
    this.authService.signOut()
  }

  ngOnDestroy() {
    console.log('ngOnDestroy')
    // force unsubscribe
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
