import { Component, OnInit } from '@angular/core';
import {ModalController, PickerController} from "@ionic/angular";
import {Ride} from "../../model/ride";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RideService} from "../../services/ride.service";
import * as moment from "moment";

@Component({
  selector: 'app-my-tremp-modal',
  templateUrl: './my-tremp-modal.component.html',
  styleUrls: ['./my-tremp-modal.component.scss'],
})
export class MyTrempModalComponent  implements OnInit {
  name: string = '';
  ride!: Ride;
  currentTime = moment()
  isNew = true;
  dynamicForm!: FormGroup;
  zoneList= this.rideService.getZoneList()
  hourList= this.rideService.getHourList()
  constructor(private modalCtrl: ModalController,
              private formBuilder: FormBuilder,
              private pickerController: PickerController,
              private rideService: RideService) {}
ngOnInit() {
  this.dynamicForm = this.formBuilder.group({
    isDriver: [this.isNew ? 'טרמפיסט' : this.ride.isDriver, [Validators.required]],
    fullName: [this.isNew ? '' : this.ride.fullName, [Validators.required]],
    pickupStartTime: [this.isNew ? moment() : moment(this.ride.pickupStartTime), [Validators.required]],
    hourFrom: [this.isNew ? null : this.ride.hourFrom, [Validators.required]],
    hourTo: [this.isNew ? null : this.ride.hourTo, [Validators.required]],
    rideFrom: [this.isNew ? '' : this.ride.rideFrom, [Validators.required]],
    rideFromRemark: [this.isNew ? '' : this.ride.rideFromRemark, [Validators.required]],
    rideTo: [this.isNew ? '' : this.ride.rideTo, [Validators.required]],
    rideToRemark: [this.isNew ? '' : this.ride.rideToRemark, [Validators.required]],
    remarks: [this.isNew ? '' : this.ride.remarks, [Validators.required]],
  });

  this.currentTime = this.isNew ? moment() : moment(this.ride.pickupStartTime)
}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.ride = this.dynamicForm.value;
    console.log(this.ride)
    this.ride.pickupStartTime = moment(this.ride.pickupStartTime).unix()
    return this.modalCtrl.dismiss(this.ride, 'confirm');
  }

  fromHourSelected(event: any) {
    console.log(parseInt(event.value))
  this.dynamicForm.controls['hourTo'].setValue(  '' + (parseInt(event.value)))
  }

  toHourSelected(event: any) {
    console.log(parseInt(event.value))
    if (parseInt(event.value) < parseInt(this.dynamicForm.controls['hourFrom'].value)) {
      this.dynamicForm.controls['hourTo'].setValue(  '' + (parseInt(this.dynamicForm.controls['hourFrom'].value)))
    }
  }
}
