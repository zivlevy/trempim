export interface Ride {

  uid?: string;
  rideNumber?: number;
  isDriver: 'נהג' |'טרמפיסט';
  fullName: string;
  phone: string;

  pickupStartTime?: number;
  pickupEndTime?: number;
  rideDateString?: string;
  pickupDate?: number;
  hourFrom?: number;
  hourTo?: number;
  rideType?: RideType;

  rideFrom?: string;
  rideFromRemark?: string;

  rideTo?: string;
  rideToRemark?: string;

  noOfPassangers?: number;
  canTakePackage?: boolean;

  remarks?: string;

  rideIsPublished?: boolean;
  rideIsDone?: boolean;
  rideIsCanceled?: boolean;

  updateAt?: number;

}

export enum RideType {
  TREMP = 'tremp',
  CARGO = 'cargo',
}
