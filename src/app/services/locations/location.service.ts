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


  controllerName = 'Location';

  apiURL: string = '';

  constructor(private http: CustomHttp) { }

  getAllLocations(){
    
    return LOC_LIST;
  }

  getAllLocation(): Observable<any> {
    return this.http.get(this.controllerName)
      .pipe(
        map(response => response)
      );
  }

  createLocation(body: Location){
    return this.http.post(this.controllerName, body)
    .pipe(
      map(response => response)
    );
  }
}
