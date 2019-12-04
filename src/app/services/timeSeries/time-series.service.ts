import { Injectable } from '@angular/core';
import { CustomHttp } from '../custom_http/custom_http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Alert } from '../../models/alert.model';
import { AppConstants } from '../../helpers/app.constants';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimeSeriesService {

  constructor(private http: CustomHttp) { }

  getSignalsAssociatedAssetByOrgId(orgId: string): Observable<any> {
    return this.http.get(`${AppConstants.GET_TIMESERIES_SIGNAL}/${orgId}`)
      .pipe(
        map(response => response)
      );
  }

  getTimeSeriesAggregateMultipleDevices(body: any) {
    return this.http.post(AppConstants.POST_GETTIMESERIESAGGREGATEMULTIPLEDEVICES, body)
      .pipe(
        map(response => response)
      );
  }


  getUpdatedTimeSeriesAggregateMultipleDevices() {
    return this.http.get(`${AppConstants.GET_UPDATEDTIMESERIES_SIGNAL}`)
      .pipe(
        map(response => response)
      );
  }
  // /v1/SignalAssociatedwithAssetLocationByOrganization/{organizationId}


  getDataTable(){
    return this.http.get(`${AppConstants.GET_DATATABLE}`)
    .pipe(
      map(response => response)
    );
  }
  // /v1/Dashboard/getTimeseriesDatatable

  getTimeSeriesSignalsByLocationID(locationId){
    // return this.http.get(AppConstants.GET_SIGNAL_ASSOCIATION + '/' + locId + '/LocationAssociation');
    return this.http.get(`${AppConstants.GET_SIGNAL_ASSOCIATION}/${locationId}/LocationAssociation`)
    .pipe(
      map(response => response)
    );
  }

  getTimeSeriesSignalsByAssetID(assetId){
    return this.http.get(AppConstants.GET_SIGNAL_ASSOCIATION + '/' + assetId + '/AssetAssociation');
  }

}