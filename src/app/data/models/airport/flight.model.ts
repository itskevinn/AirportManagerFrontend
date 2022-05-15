import {Airline} from "./airline.model";
import {City} from "./city.model";

export interface Flight {
  checkInTime: string;
  checkOutTime: string;
  checkOutDate: Date;
  flightStatus: string;
  airline: Airline;
  departureCity: City;
  destinyCity: City;
  createdBy: string;
  updatedBy?: string;
}
