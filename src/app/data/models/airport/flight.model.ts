import {Airline} from "./airline.model";
import {City} from "./city.model";

export interface Flight {
  airline: Airline;
  departureCity: City;
  destinyCity: City;
}
