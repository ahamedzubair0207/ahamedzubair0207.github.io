import { Injectable } from '@angular/core';
import { LOC_LIST } from '../mock/mock-location-list';
import { CustomHttp } from '../custom_http/custom_http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Location } from 'src/app/models/location.model';
import { AppConstants } from '../../helpers/app.constants';
import { HttpParams, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  parentLocation: { locId: string, locName: string };

  apiURL: string = '';

  constructor(private http: CustomHttp, private httpClient: HttpClient) { }

  getAllLocation() {

    return LOC_LIST;
  }

  getLocationTree(locId: string): Observable<any> {
    return this.http.get(AppConstants.GET_LOC_TREE + '/' + locId)
      .pipe(
        map(response => response)
      );
  }

  getAllLocationTree(): Observable<any> {
    return this.http.get(AppConstants.GET_LOC_TREE)
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

  createLocation(body: Location) {
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

  deleteLocation(locationId: string) {
    return this.http.delete(AppConstants.DEL_LOC + '/' + locationId, locationId)
      .pipe(
        map(response => response)
      );
  }

  getLocationInfoFromAzureMap(address: string) {
    let params = new HttpParams()
    .set('api-version', '1.0')
    .set('subscription-key', 'g5km6coCc-GZ7BuSq2OXfwBK_sswYgVMG10VZ6yu4Rg')
    .set('query', address);
    console.log('params ', params.toString())
    return this.httpClient.get('https://atlas.microsoft.com/search/address/json', { params })
      .pipe(
        map(response => response)
      );
  }
}
