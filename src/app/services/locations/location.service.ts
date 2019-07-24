import { Injectable } from '@angular/core';
import {LOC_LIST} from '../mock/mock-location-list';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getAllLocations(){
    return LOC_LIST;
  }
}
