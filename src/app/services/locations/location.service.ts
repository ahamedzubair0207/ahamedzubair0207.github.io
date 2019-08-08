import { Injectable } from '@angular/core';
import {LOC_LIST} from '../mock/mock-location-list';
import { CustomHttp} from '../custom_http/custom_http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Location } from 'src/app/models/location.model';
import { AppConstants } from '../../helpers/app.constants';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  apiURL: string = '';

  constructor(private http: CustomHttp) { }

  getAllLocation(){
    
    return LOC_LIST;
  }

  getLocationTree(locId: string): Observable<any> {
    return this.http.get(AppConstants.GET_LOC_TREE + '/' + locId)
      .pipe(
        map(response => response)
      );
  }

  getLocationById(locId: string): Observable<any> {
    return this.http.get(AppConstants.GET_LOC + '/' + locId)
      .pipe(
        map(response => response)
      );
  }

  createLocation(body: Location){
    return this.http.post(AppConstants.CREATE_LOC, body)
    .pipe(
      map(response => response)
    );
  }

  updateLocation(body: Location) {
    
    return this.http.patch(AppConstants.EDIT_LOC + '/' + body.locationId, body)
      .pipe(
        map(response => response)
      );
  }
  
  deleteLocation(locId: string){
    return this.http.delete(AppConstants.DEL_LOC, locId)
      .pipe(
        map(response => response)
      );
  }
}
