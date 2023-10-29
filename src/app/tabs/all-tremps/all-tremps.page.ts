import { Component, OnInit } from '@angular/core';
import {InfiniteScrollCustomEvent} from "@ionic/angular";

@Component({
  selector: 'app-all-tremps',
  templateUrl: './all-tremps.page.html',
  styleUrls: ['./all-tremps.page.scss'],
})
export class AllTrempsPage implements OnInit {
  items= []
  constructor() { }

  ngOnInit() {
    this.generateItems();
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      // @ts-ignore
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev: any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
